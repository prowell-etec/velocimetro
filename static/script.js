// Função para animar os números enquanto aguarda o resultado
function animateNumbers(element, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  
  let timer = setInterval(() => {
      current += increment;
      element.textContent = Math.min(Math.max(current, start), end);
      if (current == end) {
          clearInterval(timer);
      }
  }, stepTime);
}

document.getElementById('run-test').addEventListener('click', async () => {
  const downloadElement = document.getElementById('download-speed');
  const uploadElement = document.getElementById('upload-speed');
  const statusMessage = document.getElementById('status-message');

  // Exibe mensagem de "Aguarde..."
  statusMessage.textContent = "Aguarde...";
  statusMessage.className = 'awaiting';

  // Exibe animação de carregamento
  downloadElement.classList.add('loading');
  uploadElement.classList.add('loading');

  // Inicia a animação dos números (contagem)
  animateNumbers(downloadElement, 0, 100, 30000); // Simulação de download
  animateNumbers(uploadElement, 0, 100, 25000);   // Simulação de upload

  // Faz a requisição para o backend (Flask) para obter os resultados reais
  const response = await fetch('/test-speed');
  const data = await response.json();

  // Remove a animação de carregamento e define o valor real
  downloadElement.classList.remove('loading');
  uploadElement.classList.remove('loading');
  
  // Exibe os resultados reais
  animateNumbers(downloadElement, 0, data.download, 10000); // Mostra o resultado real
  animateNumbers(uploadElement, 0, data.upload, 8000);     // Mostra o resultado real

  // Atualiza a mensagem para "Teste finalizado!" em verde
  statusMessage.textContent = "Teste finalizado!";
  statusMessage.className = 'finished';
});
