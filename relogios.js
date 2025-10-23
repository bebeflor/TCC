document.addEventListener('DOMContentLoaded', () => {
  // --- Lógica do carrossel ---
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const imagens = carousel.querySelectorAll('img');
    const info = document.getElementById('info');
    let index = 0;

    function mostrarImagem(i) {
      imagens.forEach((img, idx) => {
        img.style.display = idx === i ? 'block' : 'none';
      });
    }

    mostrarImagem(index);

    setInterval(() => {
      index = (index + 1) % imagens.length;
      mostrarImagem(index);
    }, 3000);

    imagens.forEach(img => {
      img.addEventListener('click', () => {
        if (info) info.innerText = img.alt;
      });
    });
  }

  // --- Lógica dos botões "Fazer pedido" ---
  // Seleciona botões usados nas páginas (.pedido-btn) e também .btn-fazer-pedido por compatibilidade
  const botoesPedido = document.querySelectorAll('.pedido-btn, .btn-fazer-pedido');
  
  botoesPedido.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // tenta extrair nome e preço do card pai
      const card = botao.closest('.card') || botao.closest('.produto');
      const nome = card?.querySelector('.titulo')?.innerText
                || card?.querySelector('.titulo-produto')?.innerText
                || card?.querySelector('p')?.innerText
                || botao.dataset.produto
                || 'Produto';
      const preco = card?.querySelector('.preco')?.innerText
                 || (card?.querySelector('p')?.innerText.match(/R\$\s?\d+[\d\.,]*/) || [''])[0]
                 || botao.dataset.preco
                 || '';

      // salva em sessionStorage com fallback para localStorage
      const key = 'pedido_items';
      try {
        const existing = JSON.parse(sessionStorage.getItem(key) || '[]');
        existing.push({ produto: nome, preco });
        sessionStorage.setItem(key, JSON.stringify(existing));
      } catch (err) {
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({ produto: nome, preco });
        localStorage.setItem(key, JSON.stringify(existing));
      }

      // redireciona para a página de pedido (mesmo comportamento das outras páginas)
      window.location.href = 'pedido.html';
    });
  });
});

