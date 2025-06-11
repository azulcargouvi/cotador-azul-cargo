async function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const msg = document.getElementById('msg');

  const res = await fetch('https://ediapi.onlineapp.com.br/toolkit/api/Autenticacao/AutenticarUsuario', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ Email: email, Senha: senha })
  });

  const json = await res.json();
  if (!json.HasErrors) {
    localStorage.setItem('token', json.Value);
    window.location = 'cotacao.html';
  } else {
    msg.innerText = json.ErrorText || 'Erro na autenticação.';
  }
}
