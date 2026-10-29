
const perfis = [
  {
    id: 1,
    nome: "Engenheiro de Sistemas",
    categoria: "Construção",
    descricao:
      "Responsável pela manutenção dos sistemas, pelo desenvolvimento de soluções técnicas e pelo funcionamento dos equipamentos da expedição.",
    missao:
      "Recomendação: atuar na manutenção da nave, reparar equipamentos e desenvolver ferramentas para a exploração.",
    imagem: "img/engenheiro.jpg"
  },
  {
    id: 2,
    nome: "Cientista Explorador",
    categoria: "Investigação",
    descricao:
      "Responsável pela análise de evidências, pela pesquisa científica e pelo estudo das características do planeta.",
    missao:
      "Recomendação: analisar amostras, estudar formas de vida e investigar fenômenos desconhecidos em Aura.",
    imagem: "img/cientista.jpg"
  },
  {
    id: 3,
    nome: "Explorador de Campo",
    categoria: "Exploração",
    descricao:
      "Responsável pelo reconhecimento territorial, pelo mapeamento de regiões e pela identificação de rotas seguras.",
    missao:
      "Recomendação: mapear áreas desconhecidas, identificar recursos e avaliar as condições do terreno.",
    imagem: "img/explorador.jpg"
  },
  {
    id: 4,
    nome: "Estrategista da Missão",
    categoria: "Planejamento",
    descricao:
      "Responsável pela organização dos recursos, pela avaliação de riscos e pela coordenação das atividades da equipe.",
    missao:
      "Recomendação: organizar as operações, distribuir tarefas e definir estratégias para a segurança da expedição.",
    imagem: "img/estrmiss.jpg"
  }
];

function calcularIdade(data) {
  const nascimento = new Date(data + "T00:00:00");
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const aniversarioAindaNaoOcorreu =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() < nascimento.getDate());

  if (aniversarioAindaNaoOcorreu) {
    idade--;
  }

  return idade;
}

function descobrirPerfil() {
  const nome = document.getElementById("nome").value.trim();
  const nascimento = document.getElementById("nascimento").value;

  const respostas = [
    document.getElementById("resposta1").value,
    document.getElementById("resposta2").value,
    document.getElementById("resposta3").value,
    document.getElementById("resposta4").value
  ];

  if (!nome || !nascimento || respostas.some(r => r === "")) {
    alert("Preencha o nome, a data de nascimento e todas as perguntas.");
    return;
  }

  const nascimentoValido =
    /^\d{4}-\d{2}-\d{2}$/.test(nascimento);

  if (!nascimentoValido) {
    alert("Informe uma data de nascimento válida.");
    return;
  }

  const [ano, mes, dia] = nascimento.split("-").map(Number);
  const dataNascimento = new Date(ano, mes - 1, dia);
  const hoje = new Date();

  if (
    dataNascimento.getFullYear() !== ano ||
    dataNascimento.getMonth() !== mes - 1 ||
    dataNascimento.getDate() !== dia
  ) {
    alert("Informe uma data de nascimento válida.");
    return;
  }

  hoje.setHours(0, 0, 0, 0);

  if (dataNascimento > hoje) {
    alert("A data de nascimento não pode estar no futuro.");
    return;
  }

  const idade = calcularIdade(nascimento);

  const pontuacao = {
    construcao: 0,
    investigacao: 0,
    exploracao: 0,
    planejamento: 0
  };

  respostas.forEach(resposta => {
    if (Object.hasOwn(pontuacao, resposta)) {
      pontuacao[resposta]++;
    }
  });

  const categorias = [
    { chave: "construcao", perfil: perfis[0] },
    { chave: "investigacao", perfil: perfis[1] },
    { chave: "exploracao", perfil: perfis[2] },
    { chave: "planejamento", perfil: perfis[3] }
  ];

  const maiorPontuacao = Math.max(
    ...Object.values(pontuacao)
  );

  const empatados = categorias
    .filter(item => pontuacao[item.chave] === maiorPontuacao)
    .map(item => item.perfil);

  const perfilEscolhido =
    empatados[Math.floor(Math.random() * empatados.length)];

  document.getElementById("titulo_resultado").textContent =
    "Relatório de " + nome;

  document.getElementById("categoria_resultado").textContent =
    perfilEscolhido.categoria;

  document.getElementById("nome_perfil").textContent =
    perfilEscolhido.nome;

  document.getElementById("descricao_perfil").textContent =
    perfilEscolhido.descricao;

  document.getElementById("missao_perfil").textContent =
    perfilEscolhido.missao;

  document.getElementById("idade_resultado").textContent =
    "Participante: " + nome + " | Idade: " + idade + " anos";

  document.getElementById("numero_perfil").textContent =
    String(perfilEscolhido.id).padStart(2, "0");

  document.getElementById("mensagem_resultado").textContent =
    empatados.length > 1
      ? "A análise identificou compatibilidade equivalente entre diferentes funções. O sistema selecionou uma delas para esta recomendação."
      : "A análise das respostas identificou a função com maior compatibilidade para esta missão.";

  const imagemPerfil = document.getElementById("imagem_perfil");

  imagemPerfil.style.backgroundImage =
    `linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent 55%), url("${perfilEscolhido.imagem}")`;

  document.getElementById("tela_inicial").classList.add("escondido");
  document.getElementById("resultado").classList.remove("escondido");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function refazerTeste() {
  document.getElementById("formulario").reset();

  document.getElementById("resultado").classList.add("escondido");
  document.getElementById("tela_inicial").classList.remove("escondido");

  document.getElementById("imagem_perfil").style.backgroundImage = "";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("descobrir").addEventListener(
  "click",
  descobrirPerfil
);

document.getElementById("refazer").addEventListener(
  "click",
  refazerTeste
);
