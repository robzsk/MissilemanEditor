const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

try {
	require('electron-reloader')(module, {
      ignore: ['node_modules', 'src']
    }
  );
} catch (err) {}

let win;

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(url.format({
    pathname: path.join(__dirname, './dist/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.on('closed', () => {
    win1 = null;
  });
});
