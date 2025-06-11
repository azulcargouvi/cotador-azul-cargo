async function emitirEnvio() {
  const token = localStorage.getItem('token');
  const tipo = document.getElementById('tipoDocumento').value;

  const participanteEmitente = {
    Nome: document.getElementById('nomeEmit').value,
    CNPJCPF: document.getElementById('cnpjEmit').value,
    Email: document.getElementById('emailEmit').value,
    Telefone: document.getElementById('foneEmit').value,
    Endereco: document.getElementById('enderecoEmit').value,
    Estado: document.getElementById('estadoEmit').value,
    CEP: document.getElementById('cepEmit').value,
    Tipo: 'Remetente'
  };

  const participanteDest = {
    Nome: document.getElementById('nomeDest').value,
    CNPJCPF: document.getElementById('cpfDest').value,
    Email: document.getElementById('emailDest').value,
    Telefone: document.getElementById('foneDest').value,
    Endereco: document.getElementById('enderecoDest').value,
    Estado: document.getElementById('estadoDest').value,
    CEP: document.getElementById('cepDest').value,
    Tipo: 'Destinatario'
  };

  const body = {
    Token: token,
    FormaPagamento: tipo === 'NFe' ? 'PX' : 'PP',
    ProdutoNatureza: document.getElementById('produtoNatureza').value,
    ListaParticipantes: [participanteEmitente, participanteDest],
    ListaDocumentos: tipo === 'NFe' ? [{
      Tipo: 'NF-e',
      Numero: '',
      Serie: '',
      DataEmissao: document.getElementById('dataDocumento').value,
      ValorTotal: parseFloat(document.getElementById('valorDocumento').value),
      ChaveAcesso: document.getElementById('chaveAcesso').value
    }] : [],
    ListaEmbalagens: [], // Idealmente reutilizar info da cotação
    UnidadeOrigemSigla: '',
    UnidadeDestinoSigla: '',
    SiglaServico: ''
  };

  const res = await fetch('https://ediapi.onlineapp.com.br/toolkit/api/EmissaoAWB/Enviar', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });

  const json = await res.json();
  const div = document.getElementById('resposta');
  if (json.HasErrors) {
    div.innerText = json.ErrorText;
  } else {
    div.innerHTML = `<h3>Minuta gerada com sucesso!</h3><p>Código: ${json.Value.Codigo}</p>`;
  }
}
