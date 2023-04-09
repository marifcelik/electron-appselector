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
})

app.on('window-all-closed', app.quit)

ipcMain.handle('modal', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'uygulama ya da kısayol seç',
    properties: ['multiSelections', 'openFile'],
    filters: [
      { name: 'destkop files', extensions: ['desktop'] }
    ]
  })

  console.log(filePaths)

  return canceled ? null : filePaths
})
