const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { join } = require('path')

app.whenReady().then(() => {
  const window = new BrowserWindow({
    width: 1000,
    height: 750,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      sandbox: false,
      nodeIntegration: true
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    window.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    window.loadFile('dist/index.html')
  }

  window.on('ready-to-show', () => {
    window.show()
    window.webContents.openDevTools()
  })
});

app.on('window-all-closed', app.quit);

ipcMain.handle('modal', async () => {
  const filters = process.platform === 'linux' || process.platform === 'freebsd'
    ? [{ name: 'destkop files', extensions: ['desktop'] }]
    : [
      { name: 'exe files', extensions: ['exe'] },
      { name: 'lnk files', extensions: ['lnk'] }
    ]
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'uygulama ya da kısayol seç',
    properties: ['multiSelections', 'openFile'],
    filters
  })

  return canceled ? null : filePaths
})
