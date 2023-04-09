const { contextBridge, ipcRenderer } = require("electron");
const { readFileSync } = require('fs');
const { exec } = require('child_process');
const ini = require('ini');
const findIcon = require('freedesktop-icons');

let fileHandler;

switch (process.platform) {
  case 'linux':
  case 'freebsd':
    /** @param {string} path */
    fileHandler = async (path) => {
      const file = ini.parse(readFileSync(path, 'utf-8'))['Desktop Entry'];
      // const name = file.Name;
      // const icon = file.Icon;
      // const comment = file.Comment;

      const iconPath = await findIcon({ name: file.Icon, type: 'scalable' });
      console.log(iconPath);

      console.log(file)
      exec(file.Exec, (err, stdout, stderr) => {
        if (err)
          console.error(err);
      })
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
