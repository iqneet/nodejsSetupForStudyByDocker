const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.resolve(__dirname, "../../users.db"), (err) => {
  if (err) console.error("Failed to connect:", err);
  else console.log("SQLite DB connected!");
});

// ユーザーテーブル作成
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`,
  (err) => {
    if (err) console.error("Table creation failed:", err);
    else console.log("Users table ready");
  }
);

module.exports = db;