const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	test: callback => ipcRenderer.on('save', callback),
	openFile: callback => ipcRenderer.on('open-file', callback)
});
