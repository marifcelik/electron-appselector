const { readFileSync } = require('fs');
const { exec } = require('child_process');
const { contextBridge, ipcRenderer } = require("electron");
const findIcon = require('freedesktop-icons');
const ini = require('ini');

let fileHandler;

switch (process.platform) {
  case 'linux':
  case 'freebsd':
    /** @param {string} path */
    fileHandler = async (path) => {
      const file = ini.parse(readFileSync(path, 'utf-8'))['Desktop Entry'];

      const iconPath = await findIcon({ name: file.Icon, type: 'scalable' });
      console.log(iconPath);

      // exec(file.Exec, (err, stdout, stderr) => {
      //   if (err)
      //     console.error(err);
      // })
    }
    break;
  case 'win32':
    /** @param {string} path */
    fileHandler = async (path) => {
      // TODO:
      throw new Error('TODO');
    }
    break;
  default:
    throw new Error('Not Implemented');
}

const API = {
  uploadFile: fileHandler,
  async selectFile() {
    const files = await ipcRenderer.invoke('modal');

    for (const file of files) {
      fileHandler(file);
    }
  }
}

contextBridge.exposeInMainWorld('api', API);
