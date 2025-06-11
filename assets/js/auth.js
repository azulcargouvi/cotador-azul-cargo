document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede recarregamento da página

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
      alert('Preencha e-mail e senha!');
      return;
    }

    // Faz requisição à API da Azul Cargo
    fetch('https://ediapi.onlineapp.com.br/toolkit/api/Autenticacao/AutenticarUsuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, senha: senha })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = 'cotacao.html'; // Redireciona
        } else {
          alert('Falha na autenticação. Verifique suas credenciais.');
        }
      })
      .catch(err => {
        console.error('Erro na requisição:', err);
        alert('Erro ao tentar autenticar.');
      });
  });
});
