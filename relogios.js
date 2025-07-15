document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
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
      info.innerText = img.alt;
    });
  });
});
