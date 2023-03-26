const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let win;

const createWindow = () => {
	win = new BrowserWindow({
		width: 600,
		height: 400,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});
	const menu = Menu.buildFromTemplate([
		{
			label: 'File',
			submenu: [
				{
					label: 'Save As...',
					click: () => {
						win.webContents.send('save', 'send');
					},
					accelerator: 'ctrl+shift+s'
				},
				{ type: 'separator' },
				{
					label: 'Open File...',
					click: async () => {
						const content = await openFile();
						win.webContents.send('open-file', content);
					},
					accelerator: 'ctrl+o'
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' }
			]
		},
		{
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forceReload' },
				{ role: 'toggleDevTools' },
				{ type: 'separator' },
				{ role: 'resetZoom' },
				{ role: 'zoomIn' },
				{ role: 'zoomOut' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' }
			]
		}
	]);
	Menu.setApplicationMenu(menu);
	win.loadFile('index.html');
};

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('save', (_event, args) => {
	save(args);
});

async function save(content) {
	const { canceled, filePath } = await dialog.showSaveDialog(win, {
		defaultPath: 'untitled.txt',
		filters: [
			{
				name: 'file',
				extensions: 'txt'
			}
		]
	});
	if (canceled) {
		return;
	}

	if (!fs.existsSync(filePath)) {
		fs.writeFile(filePath, content, function (err) {
			if (err) throw err;
			console.log('Saved!');
		});
	}
}

async function openFile() {
	try {
		const { canceled, filePaths } = await dialog.showOpenDialog();
		if (canceled) {
			return;
		}
		const data = fs.readFileSync(filePaths[0], 'utf8');
		return data;
	} catch (err) {
		console.error(err);
	}
}
