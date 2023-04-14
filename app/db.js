const DataBase = require('better-sqlite3');
const { homedir } = require('os')
const fs = require('fs')

const path = `${homedir()}/.local/myapp`;

if (!fs.existsSync(path)) {
  fs.promises.mkdir(path)
}

const db = new DataBase(`${path}/db.db`, { verbose: console.log });

db.exec(/*sql*/`
  CREATE TABLE IF NOT EXISTS apps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT,
    details TEXT,
    command TEXT NOT NULL
  )
`)

module.exports = db