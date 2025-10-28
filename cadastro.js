document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const senha = form.senha.value.trim();

    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    alert('Cadastro realizado com sucesso! 💛');
    window.location.href = 'inicio.html';
  });
});
