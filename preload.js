const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	test: callback => ipcRenderer.on('save', callback)
});
