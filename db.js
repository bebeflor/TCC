const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'vitaliz.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar no DB:', err.message);
  } else {
    console.log('Conectado ao SQLite DB em', dbPath);
  }
});

// Configurações úteis do SQLite
db.serialize(() => {
  // Habilita chaves estrangeiras (se usarmos no futuro)
  db.run('PRAGMA foreign_keys = ON');
  // Modo WAL melhora concorrência
  db.run('PRAGMA journal_mode = WAL');
  // Timeout para evitar SQLITE_BUSY em operações concorrentes
  db.run('PRAGMA busy_timeout = 5000');
});

// Fecha o banco graciosamente quando o processo terminar
function closeDbAndExit() {
  db.close((err) => {
    if (err) console.error('Erro ao fechar DB:', err.message);
    else console.log('DB fechado com sucesso.');
    process.exit(0);
  });
}
process.on('SIGINT', closeDbAndExit);
process.on('SIGTERM', closeDbAndExit);

module.exports = db;
