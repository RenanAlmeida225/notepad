const { app, BrowserWindow } = require('electron');
const fs = require('fs');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 600,
		height: 400
	});

	win.loadFile('index.html');
};

app.whenReady().then(() => {
	createWindow();
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

function saveAs(path, content) {
	fs.openSync(path);
	//save content in file
}
