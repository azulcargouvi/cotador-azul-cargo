document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cotacao-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const origem = form.origem.value;
      const destino = form.destino.value;
      const peso = parseFloat(form.peso.value);
      const valorNF = parseFloat(form.valorNF.value);

      // Simulação de cálculo
      const frete = (peso * 3.5) + (valorNF * 0.01);

      const resultado = document.getElementById('resultado');
      resultado.textContent = `Valor estimado do frete: R$ ${frete.toFixed(2)}`;
    });
  }
});

