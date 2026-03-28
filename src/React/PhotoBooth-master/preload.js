const { contextBridge, ipcRenderer } = require('electron');

// Exposing functions or objects to the renderer process
contextBridge.exposeInMainWorld('electron', {
  printPhoto: (printData) => ipcRenderer.invoke('print-photo', printData),
});
