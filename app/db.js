const DataBase = require('better-sqlite3');
const { homedir } = require('os')
const fs = require('fs')

class DBService {
  constructor() {
    const path = homedir() + (process.platform === 'linux' ? '/.local/myapp' : '\\%APPDATA\\myapp');

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }

    this.db = new DataBase(`${path}/db.db`, { verbose: console.log });
    console.log(this.db);

    this.db.exec(/*sql*/`
      CREATE TABLE IF NOT EXISTS apps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT,
        details TEXT,
        command TEXT NOT NULL
      )`
    )
  }

  getApps() {
    try {
      const smt = this.db.prepare(`SELECT id, name, icon FROM apps`)
      return smt.all()
    } catch (err) {
      console.log(err);
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
