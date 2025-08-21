// Estrutura Parquímetro
class Parquimetro {
  constructor() {
    this.tabela = [
      { preco: 1.0, tempo: 30 },
      { preco: 1.75, tempo: 60 },
      { preco: 3.0, tempo: 120 },
    ];
  }

  calcular(valor, tempoEscolhido) {
    // Mensagem de erro se caso o valor for menor que R$ 1,00
    if (valor < 1.0) {
      return { mensagem: "Valor Inválido! O valor mínimo é R$ 1,00" };
    }

    const escolhidoTempo = this.tabela.find(
      (item) => item.tempo === tempoEscolhido
    );

    if (!escolhidoTempo) {
      return {
        mensagem: "Tempo Inválido! Escolha um tempo de acordo com a tabela",
      };
    }

    const troco = valor - escolhidoTempo.preco;

    if (troco < 0) {
      return { mensagem: "Valor insuficiente para o tempo escolhido" };
    }

    return {
      tempo: escolhidoTempo.tempo,
      troco: troco.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
    };
  }

  formatarTempo(minutos) {
    let horas = Math.floor(minutos / 60);
    let min = minutos % 60;
    return `${String(horas).padStart(2, "0")}:${String(min).padStart(
      2,
      "0"
    )}:00`;
  }
}

document.getElementById("btn").addEventListener("click", () => {
  const valor = parseFloat(document.getElementById("valorParquimetro").value);
  const tempo = parseInt(document.getElementById("tempoParquimetro").value);

  const parquimetro = new Parquimetro();
  const resultado = parquimetro.calcular(valor, tempo);

  if (resultado.mensagem) {
    document.getElementById("resultado").textContent = resultado.mensagem;
  } else {
    document.getElementById(
      "time"
    ).textContent = `Tempo: ${parquimetro.formatarTempo(resultado.tempo)}`;
    document.getElementById(
      "resultado"
    ).textContent = `Troco: R$ ${resultado.troco}`;
  }

  document.getElementById("resultado").style.display = "flex";
});
