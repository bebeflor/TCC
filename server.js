const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas API
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/orders', (req, res) => {
  const o = req.body;
  const stmt = db.prepare(`INSERT INTO orders (nome,telefone,documento,tipoPagamento,parcelas,endereco,observacoes,produtoTitulo,produtoPreco,data) VALUES (?,?,?,?,?,?,?,?,?,?)`);
  stmt.run(o.nome, o.telefone, o.documento, o.tipoPagamento, o.parcelas, o.endereco, o.observacoes, o.produtoTitulo, o.produtoPreco, new Date().toISOString(), function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Admin authentication (simple token-based)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'secret123';
function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (token && token === ADMIN_TOKEN) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// Rota protegida para listar pedidos (admin)
app.get('/api/admin/orders', adminAuth, (req, res) => {
  db.all('SELECT * FROM orders ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Servir arquivos estáticos do projeto (pasta atual)
app.use('/', express.static(path.join(__dirname)));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
