document.addEventListener('DOMContentLoaded', () => {
  const dataInput = document.getElementById('data');
  const horarioSelect = document.getElementById('horario');
  const resultado = document.getElementById('resultado');

  // Bloqueia datas que não são quarta-feira
  dataInput.addEventListener('change', () => {
    const dataSelecionada = new Date(dataInput.value);
    const diaSemana = dataSelecionada.getDay(); // 3 = quarta

    if (diaSemana !== 3) {
      alert('Só realizamos consultas às quartas-feiras! 💛');
      dataInput.value = '';
      horarioSelect.innerHTML = '';
      resultado.innerText = '';
      return;
    }

    // Adiciona horários válidos se for quarta
    horarioSelect.innerHTML = `
      <option value="">Selecione um horário</option>
      <option>14:00</option>
      <option>15:00</option>
      <option>16:00</option>
      <option>17:00</option>
      <option>18:00</option>
    `;
  });

  // Confirma agendamento
  horarioSelect.addEventListener('change', () => {
    if (dataInput.value && horarioSelect.value) {
      resultado.innerText = `✅ Consulta marcada para ${formatarData(dataInput.value)} às ${horarioSelect.value}h.`;
    }
  });

  // Função para formatar a data no padrão brasileiro
  function formatarData(dataStr) {
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
});
