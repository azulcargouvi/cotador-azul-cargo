function gerarCamposItens() {
  const container = document.getElementById('itens');
  const qtd = parseInt(document.getElementById('quantidadeVolumes').value);
  container.innerHTML = '';
  for (let i = 1; i <= qtd; i++) {
    container.innerHTML += `
      <h3>Item ${i}</h3>
      <input placeholder="Peso" id="peso${i}">
      <input placeholder="Altura" id="altura${i}">
      <input placeholder="Comprimento" id="comprimento${i}">
      <input placeholder="Largura" id="largura${i}">
    `;
  }
}

async function cotar() {
  const token = localStorage.getItem('token');
  const coleta = document.querySelector('input[name="coleta"]:checked').value;
  const itens = [];
  const qtd = parseInt(document.getElementById('quantidadeVolumes').value);
  for (let i = 1; i <= qtd; i++) {
    itens.push({
      Volume: i,
      Peso: document.getElementById(`peso${i}`).value,
      Altura: document.getElementById(`altura${i}`).value,
      Comprimento: document.getElementById(`comprimento${i}`).value,
      Largura: document.getElementById(`largura${i}`).value
    });
  }

  const body = {
    Token: token,
    CEPOrigem: document.getElementById('cepOrigem').value,
    CEPDestino: document.getElementById('cepDestino').value,
    ValorTotal: parseFloat(document.getElementById('valorTotal').value),
    Pedido: document.getElementById('pedido').value,
    TaxaColeta: coleta === 'sim',
    TipoEntrega: 'Domicilio',
    Coleta: coleta === 'sim',
    SiglaServico: '',
    Itens: itens
  };

  const res = await fetch('https://ediapi.onlineapp.com.br/toolkit/api/Cotacao/Enviar', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });

  const json = await res.json();
  const div = document.getElementById('resultados');
  div.innerHTML = '';
  if (json.HasErrors) {
    div.innerText = json.ErrorText;
  } else {
    json.Value.forEach(servico => {
      div.innerHTML += `${servico.Servico} - R$ ${servico.Valor}<br>`;
    });
  }
}

