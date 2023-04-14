const { readFileSync, writeFileSync } = require('fs');
const { exec } = require('child_process');
const { contextBridge, ipcRenderer } = require("electron");
const ini = require('ini');
const db = require('./db');

let uploadHandler;

switch (process.platform) {
  case 'linux':
    const findIcon = require('freedesktop-icons');

    /** @param {string[]} paths */
    uploadHandler = async (paths) => {
      const iconNames = paths.map((path) => ({
        name: ini.parse(readFileSync(path, 'utf-8'))['Desktop Entry'].Icon,
        type: 'scalable'
      }))

      console.log(iconNames);
      // TODO: find multiple icons
      // const iconPath = await findIcon({ name: file.Icon, type: 'scalable' });
      const iconPaths = await findIcon(iconNames)
      console.log(iconPaths);

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
  getApps: () => {
    try {
      return db.prepare(`SELECT * FROM apps`).all()
    } catch (err) {
      return { error: true, details: err.toString() }
    }
  },
  createApp: (name, icon, details = null, command) => {
    try {
      const query = db.prepare(`INSERT INTO apps (name, icon, details, command) VALUES (?, ?, ?, ?)`);
      return query.run(name, icon, details, command)
    } catch (err) {
      return { error: true, details: err.toString() }
    }
  },
  updateApp: (id, name, icon, details, command) => {
    try {
      const query = db.prepare(`UPDATE apps name = ?, icon = ?, details = ?, command = ? WHERE id = ?`);
      return query.run(name, icon, details, command, id)
    } catch (err) {
      return { error: true, details: err.toString() }
    }
  },
  deleteApp: (id) => {
    try {
      const query = db.prepare(`DELETE FROM apps WHERE id = ?`);
      return query.run(id)
    } catch (err) {
      return { error: true, details: err.toString() }
    }
  },
  uploadFiles: uploadHandler,
  dropFiles: async () => uploadHandler(await ipcRenderer.invoke('modal'))
}

contextBridge.exposeInMainWorld('api', API);
