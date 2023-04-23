const { join } = require('path')
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const { mkdir, existsSync } = require('fs');

app.whenReady().then(() => {
  const window = new BrowserWindow({
    minWidth: 1000,
    minHeight: 750,
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
    window.loadFile('vue/index.html')
  }

  const datadir = app.getPath('appData')
  const path = join(datadir, 'myapp')

  if (!existsSync(join(path, 'icons')))
    mkdir(join(path, 'icons'), { recursive: true }, (err) => {
      if (err)
        console.log(err);
    })

  window.on('ready-to-show', () => {
    window.show()
    // window.webContents.openDevTools()
  })

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

  ipcMain.handle('datadir', () => path)
});

app.on('window-all-closed', app.quit);