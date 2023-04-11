const { contextBridge, ipcRenderer } = require("electron");
const { readFileSync, writeFileSync } = require('fs');
const { exec } = require('child_process');
const ini = require('ini');

let uploadHandler;

switch (process.platform) {
  case 'linux':
    const findIcon = require('freedesktop-icons');

    /** @param {string[]} paths */
    uploadHandler = async (paths) => {
      const iconNames = paths.map((path) =>
        (({ Icon }) => Icon)(ini.parse(readFileSync(path, 'utf-8'))['Desktop Entry'])
      )

      console.log(iconNames);
      // TODO: find multiple icons
      // const iconPath = await findIcon({ name: file.Icon, type: 'scalable' });

      // console.log(file)
      // exec(file.Exec, (err, stdout, stderr) => {
      //   if (err)
      //     console.error(err);
      // })
    }
    break;

  case 'win32':
    const { sync: lnkParse } = require('get-windows-shortcut-properties')
    const { getIcon, emitter: iconEmitter } = require('icon-extractor')

    /** @param {string[]} paths */
    uploadHandler = async (paths) => {
      console.log(paths);

      iconEmitter.on('icon', ({ Context, Path, Base64ImageData }) => {
        console.log(Path)
        writeFileSync('deneme.jpg', Base64ImageData, { encoding: 'base64' })
      })  

      paths.forEach(path => getIcon('icon', path))

    }
    break;

  default:
    throw new Error('Not Implemented');
}

const API = {
  uploadFiles: uploadHandler,
  async dropFiles() {
    const files = await ipcRenderer.invoke('modal');
    uploadHandler(files);
  }
}

contextBridge.exposeInMainWorld('api', API);
