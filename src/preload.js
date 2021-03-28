const {
    contextBridge,
    ipcRenderer
} = require("electron");

console.log("In preload.js");
ipcRenderer.on("SYNC_TASKS", (data) => {});
console.log(`Added event successfully in preload? ${Object.keys(ipcRenderer._events).length === 1 ? "Yes" : "No"}`);

contextBridge.exposeInMainWorld(
    "electron", {
        ipcRenderer: ipcRenderer
    }
);