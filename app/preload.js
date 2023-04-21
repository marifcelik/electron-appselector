const { readFileSync, writeFileSync, copyFileSync } = require('fs');
const { join: joinPath } = require('path');
const { exec } = require('child_process');
const { contextBridge, ipcRenderer } = require("electron");
const db = require('./db');

let uploadHandler;

switch (process.platform) {
  case 'linux':
    const ini = require('ini');
    const findIcon = require('freedesktop-icons');

    /** @param {string[]} paths */
    uploadHandler = (paths) => paths.map(async (path) => {
      const parsedFile = ini.parse(readFileSync(path, 'utf-8'))['Desktop Entry'];
      let iconPath = await findIcon({ name: parsedFile.Icon, type: 'scalable' })

      console.log(__dirname);
      console.log(parsedFile);
      console.log(iconPath);

      if (iconPath) {
        const localPath = joinPath(__dirname, '/icons', iconPath.slice(iconPath.lastIndexOf('/') + 1));
        copyFileSync(iconPath, localPath);
        iconPath = localPath;
      }

      db.createApp({
        name: parsedFile.Name,
        icon: iconPath,
        details: parsedFile.Comment || null,
        command: parsedFile.Exec
      })
    })

    // const iconPath = await findIcon({ name: file.Icon, type: 'scalable' });
    // const iconPaths = await findIcon(iconNames, undefined, undefined, '/home/arif/deneme')
    break;

  case 'win32':
    const { getIcon, emitter: iconEmitter } = require('icon-extractor')

    /** @param {string[]} paths */
    uploadHandler = async (paths) => {
      console.log(paths);

      iconEmitter.on('icon', ({ Base64ImageData }) => {
        writeFileSync('deneme.jpg', Base64ImageData, { encoding: 'base64' })
      })

      paths.forEach(path => getIcon('icon', path))
    }
    break;

  default:
    throw new Error('This os not supported.');
}

const API = {
  // REVIEW: Not worked like this. idk why. look about later
  // getApps: db.getApps,
  getApps: () => db.getApps(),
  getAppById: (id) => db.getAppById(id),
  selectFiles: async () => await ipcRenderer.invoke('modal'),
  uploadFiles: uploadHandler,
  async dropFiles() {
    const files = await ipcRenderer.invoke('modal');
    if (files)
      uploadHandler(files);
  },
  runApp: command => exec(command)
}

contextBridge.exposeInMainWorld('api', API);
