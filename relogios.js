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
  const botoesPedido = document.querySelectorAll('.btn-fazer-pedido');
  
  botoesPedido.forEach(botao => {
    botao.addEventListener('click', (e) => {
      e.preventDefault(); // evita recarregar ou seguir link
      const card = botao.closest('.card'); // ou ajuste conforme seu HTML
      const nomeProduto = card?.querySelector('.titulo-produto')?.innerText || 'Produto';
      
      // Aqui você escolhe o que acontece ao clicar:
      console.log(`Pedido solicitado: ${nomeProduto}`);
      alert(`Você clicou em "${nomeProduto}"`);
      
      // Exemplo: abrir modal, redirecionar pro WhatsApp etc.
      // window.open(`https://wa.me/5581999999999?text=Quero comprar o ${nomeProduto}`, '_blank');
    });
  });
});

