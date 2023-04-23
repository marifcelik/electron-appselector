const { ipcRenderer } = require('electron');
const DataBase = require('better-sqlite3');

class DBService {
  constructor() {
    ipcRenderer.invoke('datadir').then(path => {
      this.db = new DataBase(`${path}/db.db`, { verbose: console.log });

      this.db.exec(/*sql*/`
        CREATE TABLE IF NOT EXISTS apps (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          icon TEXT,
          details TEXT,
          command TEXT NOT NULL
        )`
      )
    })
  }

  getApps() {
    try {
      const smt = this.db.prepare(`SELECT id, name, icon FROM apps`)
      return smt.all();
    } catch (err) {
      return { error: true, details: err.toString() }
    }
  }

  getAppById(id) {
    try {
      const query = this.db.prepare(`SELECT * FROM apps WHERE id = ?`);
      return query.get(id)
    } catch (err) {
      return { error: true, details: err.toString() }
    }
  }

  createApp({ name, icon, details, command }) {
    try {
      // remove % commands 
      if (command.includes('%'))
        command = command.slice(0, command.indexOf('%'))

      const query = this.db.prepare(`INSERT INTO apps (name, icon, details, command) VALUES (?, ?, ?, ?)`);
      return query.run(name, icon, details, command)
    } catch (err) {
      return { error: true, details: err.toString() }
    }
  }

  updateApp({ id, name, icon, details, command }) {
    try {
      const query = this.db.prepare(`UPDATE apps name = ?, icon = ?, details = ?, command = ? WHERE id = ?`);
      return query.run(name, icon, details, command, id)
    } catch (err) {
      return { error: true, details: err.toString() }
    }
  }

  deleteApp(id) {
    try {
      const query = this.db.prepare(`DELETE FROM apps WHERE id = ?`);
      return query.run(id)
    } catch (err) {
      return { error: true, details: err.toString() }
    }
  }
}

module.exports = new DBService()
