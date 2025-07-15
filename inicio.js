document.addEventListener('DOMContentLoaded', () => {
  const btnTop = document.createElement('button');
  btnTop.innerText = '↑';
  btnTop.id = 'btnTop';
  document.body.appendChild(btnTop);

  btnTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #002244;
    color: white;
    border: none;
    padding: 10px 14px;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 1000;
  `;

  window.addEventListener('scroll', () => {
    btnTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
