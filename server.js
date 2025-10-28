const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const validator = require('validator');

// Load environment variables from .env if present
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Basic rate limiter for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Rotas API
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Helper: validate and sanitize order payload
function sanitizeOrderPayload(body) {
  const nome = body.nome ? validator.escape(validator.trim(body.nome)) : '';
  const telefone = body.telefone ? validator.escape(validator.trim(body.telefone)) : '';
  const documento = body.documento ? validator.escape(validator.trim(body.documento)) : '';
  const tipoPagamento = body.tipoPagamento ? validator.escape(validator.trim(body.tipoPagamento)) : '';
  const parcelas = body.parcelas ? parseInt(body.parcelas, 10) : 1;
  const endereco = body.endereco ? validator.escape(validator.trim(body.endereco)) : '';
  const observacoes = body.observacoes ? validator.escape(validator.trim(body.observacoes)) : '';
  const produtoTitulo = body.produtoTitulo ? validator.escape(validator.trim(body.produtoTitulo)) : null;
  const produtoPreco = body.produtoPreco ? validator.escape(validator.trim(body.produtoPreco)) : null;
  return { nome, telefone, documento, tipoPagamento, parcelas, endereco, observacoes, produtoTitulo, produtoPreco };
}

app.post('/api/orders', (req, res) => {
  const payload = sanitizeOrderPayload(req.body || {});

  // Basic required fields
  if (!payload.nome || !payload.telefone || !payload.documento || !payload.tipoPagamento) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  const stmt = db.prepare(`INSERT INTO orders (nome,telefone,documento,tipoPagamento,parcelas,endereco,observacoes,produtoTitulo,produtoPreco,data) VALUES (?,?,?,?,?,?,?,?,?,?)`);
  stmt.run(
    payload.nome,
    payload.telefone,
    payload.documento,
    payload.tipoPagamento,
    payload.parcelas,
    payload.endereco,
    payload.observacoes,
    payload.produtoTitulo,
    payload.produtoPreco,
    new Date().toISOString(),
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Endpoint to accept multiple orders (useful for client-side sync)
app.post('/api/orders/bulk', (req, res) => {
  const items = Array.isArray(req.body) ? req.body : [];
  if (!items.length) return res.status(400).json({ error: 'Nenhum pedido fornecido' });

  db.serialize(() => {
    const stmt = db.prepare(`INSERT INTO orders (nome,telefone,documento,tipoPagamento,parcelas,endereco,observacoes,produtoTitulo,produtoPreco,data) VALUES (?,?,?,?,?,?,?,?,?,?)`);
    let inserted = 0;
    for (const it of items) {
      const p = sanitizeOrderPayload(it || {});
      if (!p.nome || !p.telefone) continue; // skip invalid
      stmt.run(p.nome, p.telefone, p.documento, p.tipoPagamento, p.parcelas, p.endereco, p.observacoes, p.produtoTitulo, p.produtoPreco, new Date().toISOString(), function(err) {
        if (!err) inserted++;
      });
    }
    stmt.finalize((err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ inserted });
    });
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
