

const net = require('net');
const tls = require('tls');
const fs = require('fs');
const util = require('../util/util');
const { remote, BrowserWindow } = require('electron')

const startAndroidBridge = (onData) => {
    
  var crypto = util.genKeys();
  
  const options = {
    key: crypto.pkey,
    cert: crypto.cert,
    rejectUnauthorized: false,
    requestCert: true
  }; 
  
  const server = tls.createServer(options, (socket) => {
   /*  console.log(socket.getPeerCertificate());
 */
    console.log('server connected',
                 socket.authorized ? 'authorized' : 'unauthorized');

    
    console.log('cipher '  + socket.getCipher().standardName);
    socket.write('wessssssssssssssssssssssssssssssssssssslcome!\n');
    socket.setEncoding('utf8');/* 
    console.log(socket.getPeerCertificate()); */

    socket.on('data', function(data){
        onData(data);
    });
    
    socket.on('end', function(){
        socket.end();
    });
    
    
    socket.on('error', function(){
      console.log("DISCONNECTED");
    })
  });   

  /* 
  var server = net.createServer(function(socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
  }); */

  server.listen(1234,'0.0.0.0');

}


exports.startAndroidBridge=startAndroidBridge;