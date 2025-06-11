document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("https://ediapi.onlineapp.com.br/toolkit/api/Autenticacao/AutenticarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      if (!response.ok) {
        throw new Error("Falha na autenticação.");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login realizado com sucesso!");
        window.location.href = "cotacao.html"; // Redireciona para a página de cotação
      } else {
        alert("Credenciais inválidas ou resposta inesperada.");
      }

    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  });
});
