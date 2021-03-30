const { triggerAsyncId } = require('async_hooks');
const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const {startAndroidBridge} = require('src/bridge/AndroidBridge')
const {startPairingBridge} = require('src/bridge/PairingBridge')

const util = require('./util/util')
const notifier = require('node-notifier');
const storage = require('electron-json-storage');
const { ipcMain } = require('electron');

const shell  = require('electron').shell;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

var mainWindow;
const createWindow = () => {
  // Create the browser window.
  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;
  let height = display.bounds.height;


  mainWindow = new BrowserWindow({
    width: 400,
    x: width - 400,
    y: height-600,
    height: 600,
    resizable:false,
    webPreferences:{
      nodeIntegration:true,
      enableRemoteModule:true,
      contextIsolation: false
    }
  });/* 
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  }); */
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.removeMenu();
  mainWindow.focus();
  mainWindow.show();
  mainWindow.webContents.openDevTools();  
  
};

function onData(data){
  
  var data = JSON.parse(data);
  //GET TYPE
  var type = data.type;
 
  //PROCESS DATA 
  if (type = "sync_tasks"){
    var result = [];
    //get tasks
    var tasks = data.tasks;
    
    //process tasks
    for(var i = 0; i < tasks.length; i++) {

      var task = tasks[i];
      if (task.type = "android_package"){
        //convert to Task Object
        var desktopTask = util.androidPackageToTask(task);
        
        if (desktopTask != null){
           result.push(desktopTask);
           
        }      
      }
    }
       //send to UI
        mainWindow.webContents.send('SYNC_TASKS', result);
             /* 
        var notifier = new WindowsToaster({withFallback:true}) */
        
        //save for later
        var nameToUrl = {};
        for (let i = 0; i < result.length; i++) {
          nameToUrl[result[i].title.toLowerCase()] = result[i].url; 
        }
        
        storage.setDataPath(path.join(__dirname, "config"))
        storage.set('notifications', nameToUrl),
        function(error){
          console.log(error);
        };

        //set up notif
        var actions = [];
        for (var index = 0; index < Math.min(result.length, 3); index++) {
          actions[index] = result[index].title;
        }
        
        if(actions.length>0){

          notifier.notify({
            title: 'Welcome Back!',
            message: 'Open ' + actions[0] + ' and pick up from where you left off.',
            appID:'com.nam.hermes',
            id:0,
            actions:actions
           }, (err, response) => {
            //if nothing, cancel
            storage.get('notifications', function(error, data){
              if (response.toLowerCase() in data){
                shell.openExternal(data[response.toLowerCase()]);
              }else{
                notifier.notify({
                  title: 'Finished',
                  appID:'com.nam.hermes',
                  remove:0
              })
            }
               
            });
          });
  
        }
        
  } 

}


ipcMain.on("START_SERVER_PAIRED", (event, dbName) => {
  startAndroidBridge(onData);
});


ipcMain.on("START_SERVER_UNPAIRED", (event, dbName) => {
  startPairingBridge(onPairRequest);
  console.log("STARTPAIR");

});

function onPairRequest(request){
  mainWindow.webContents.send('PAIR_REQUEST', request);
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  app.setAppUserModelId('com.nam.hermes')
  createWindow();


});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

