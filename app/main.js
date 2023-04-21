const { join } = require('path')
const { app, BrowserWindow, dialog, ipcMain } = require('electron')

app.whenReady().then(() => {
  const window = new BrowserWindow({
    width: 1000,
    height: 750,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      sandbox: false,
      nodeIntegration: true,
      webSecurity: false
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
  const filters = process.platform === 'linux'
    ? [{ name: 'destkop files', extensions: ['desktop'] }]
    : [{ name: 'exe files', extensions: ['exe'] }, { name: 'lnk files', extensions: ['lnk'] }]
    
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'uygulama ya da kısayol seç',
    properties: ['multiSelections', 'openFile'],
    filters
  })

  return canceled ? null : filePaths.map(value => ({ name: value.slice(value.lastIndexOf('/') + 1), path: value }))
})
