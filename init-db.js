const db = require('./db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price TEXT,
    image TEXT,
    type TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT, telefone TEXT, documento TEXT,
    tipoPagamento TEXT, parcelas INTEGER,
    endereco TEXT, observacoes TEXT,
    produtoTitulo TEXT, produtoPreco TEXT,
    data TEXT
  )`);

  const stmt = db.prepare("INSERT INTO products (title,price,image,type) VALUES (?,?,?,?)");
  stmt.run("Óculos de sol Ideal","R$ 499,90","img/armaçao1.png","feminino");
  stmt.run("Armação Ana Hickmann","R$ 568,00","img/armaçao2.png","feminino");
  stmt.run("Óculos de sol Dudalina","R$ 756,90","img/armaçao3.png","feminino");
  stmt.run("Armação Dudalina","R$ 620,00","img/armacao19.jpeg","feminino");
  stmt.finalize(() => {
    console.log('Produtos inseridos (exemplo)');
    db.close();
  });
});
