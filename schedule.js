/**
 * Line-up oficial do EloTech — revelado.
 * id de cada trilha precisa bater com a variável CSS --<id> em styles.css.
 */
const EVENT = {
  name: "EloTech",
  date: "2026-08-01", // America/Sao_Paulo (UTC-3, sem horário de verão)
  timezone: "America/Sao_Paulo",
  utcOffset: "-03:00",
  venue: "Agi Campus, Campinas/SP",
  address: "Rua Sergio Fernandes Borges Soares, 1000, Campinas, SP",
  lineupRevealed: true,
};

const TRACKS = [
  { id: "ia", label: "IA", shortLabel: "IA", room: "Arquibancada Agibank", mc: "Camila Duarte" },
  { id: "webdata", label: "Front-end / Back-end / Data", shortLabel: "Front/Back/Data", room: "Uni Agi", mc: "Diego Nunes" },
  { id: "mentoring", label: "Carreira em Tecnologia", shortLabel: "Carreira", room: "Sala de treinamento", mc: "Fernanda Lopes" },
];

function eventTime(hhmm) {
  return new Date(`${EVENT.date}T${hhmm}:00${EVENT.utcOffset}`);
}

const SCHEDULE = [
  { start: eventTime("08:00"), end: eventTime("08:30"), banner: "Credenciamento — Full Evento", room: "Hall" },
  { start: eventTime("08:30"), end: eventTime("08:50"), banner: "Apresentação GDG Campinas + agibank", room: "Auditório" },
  { start: eventTime("09:00"), end: eventTime("09:35"), talks: {
      ia: { speaker: "agibank", title: "" },
      webdata: {
        speaker: "Kevin Uehara",
        title: "Exploring Google's AI ecosystem for the modern web",
        description: "O front-end entrou oficialmente na era AI-First. Uma visão prática das Web AI APIs no Chrome, do Gemini rodando direto no navegador e do Chrome WebMCP para integrar IA de forma real nas aplicações web.",
      },
      mentoring: { speaker: "agibank", title: "" },
  }},
  { start: eventTime("09:40"), end: eventTime("10:15"), talks: {
      ia: {
        speaker: "Fabio Baldin",
        title: "Da ideia ao MVP antes do café acabar. Como a IA muda o que vem antes do código.",
        description: "Um workflow prático usando Google Docs, NotebookLM, Gemini e Lovable para transformar uma ideia em MVP funcional rapidamente — sem cair no overengineering antes mesmo de validar a hipótese.",
      },
      webdata: {
        speaker: "Vinicius Pivetta",
        title: "Como a IA generativa está mudando o trabalho do engenheiro de dados",
        description: "O impacto da IA generativa no dia a dia de quem trabalha com dados: novas formas de interação, riscos à qualidade e quais habilidades continuam relevantes nesse novo cenário.",
      },
      mentoring: {
        speaker: "Helson Carlos dos Santos",
        title: "Como formar o novo desenvolvedor sênior em tempos de IA",
        description: "Como a IA está mudando a formação de desenvolvedores juniores — o que ela não substitui, e qual é o papel dos seniores na formação dessa nova geração.",
      },
  }},
  { start: eventTime("10:20"), end: eventTime("10:55"), talks: {
      ia: {
        speaker: "Toshi Ossada",
        title: "Vamos falar de Inteligência Artificial? Usando o poder da GenUI em seus Apps Flutter",
        description: "A interseção entre IA e desenvolvimento mobile: como usar GenUI (interface generativa) para criar interfaces dinâmicas em apps Flutter.",
      },
      webdata: {
        speaker: "Beatriz Rodrigues",
        title: "Data Power: como os dados moldam o mundo (e a sua carreira)",
        description: "Um guia prático sobre o impacto dos dados no mundo, as ferramentas mais exigidas pelo mercado hoje e como entrar e se diferenciar na área de dados.",
      },
      mentoring: {
        speaker: "Jessé Freitas",
        title: "O próximo capítulo da Engenharia",
        description: "A ascensão do perfil \"builder\", a mentalidade de abundância e a orquestração de agentes de IA — como papéis técnicos e de produto estão se fundindo nesse novo capítulo da engenharia.",
      },
  }},
  { start: eventTime("11:00"), end: eventTime("11:35"), banner: "Pausa / Intervalo" },
  { start: eventTime("11:40"), end: eventTime("12:15"), talks: {
      ia: {
        speaker: "Guilherme H Silva",
        title: "Domando Multi-Agentes em Go com Phoenix",
        description: "Orquestração e observabilidade de agentes de IA em produção, com versionamento de prompts e gerenciamento de datasets na prática, usando Go e Phoenix.",
      },
      webdata: {
        speaker: "Ghabryel Henrique Ferreira e Almeida",
        title: "Arquitetura Limpa no Frontend: escalando aplicações para o mundo real",
        description: "Clean Architecture e princípios SOLID aplicados ao frontend: separação de responsabilidades para construir código mais resiliente, escalável e testável.",
      },
      mentoring: {
        speaker: "Marco Ollivier",
        title: "Toda startup começa com gambiarra, e isso pode ser uma ótima decisão",
        description: "Nem toda boa arquitetura nasce elegante. Muitas começam conectando ferramentas, automatizando planilhas, usando soluções prontas e escrevendo apenas o código necessário para validar hipóteses.\n\nNesta palestra compartilho como nossa arquitetura evoluiu ao longo do crescimento da startup, passando por ferramentas no-code, integrações low-code, desenvolvimento próprio e, mais recentemente, aplicações de Inteligência Artificial.\n\nMais do que apresentar tecnologias, discutiremos os critérios que orientaram cada decisão e como evitar tanto o overengineering quanto a dependência excessiva de ferramentas de terceiros.",
      },
  }},
  { start: eventTime("12:20"), end: eventTime("12:55"), talks: {
      ia: {
        speaker: "Leonardo Veri",
        title: "Clareza: a verdadeira oportunidade da Inteligência Artificial",
        description: "A verdadeira vantagem competitiva da IA não está nos modelos, mas na clareza para identificar os problemas certos. Frameworks práticos para gerar valor real ao negócio através de IA.",
      },
      webdata: {
        speaker: "Larissa Azevedo",
        title: "Front-end é o novo Full Stack? A evolução que transformou o papel do desenvolvedor",
        description: "Como o front-end evoluiu para um papel estratégico — performance, segurança, observabilidade, arquitetura, IA, cloud e integração de sistemas cada vez mais na mesma pessoa.",
      },
      mentoring: {
        speaker: "Alex Tavares Faiotto",
        title: "Como pensar como um arquiteto de software",
        description: "Desenvolvendo pensamento arquitetural na prática: decisões técnicas em cenários reais, monolito vs microsserviços, escolhas tecnológicas, escalabilidade, resiliência, sistemas distribuídos e o alinhamento entre técnico e produto.",
      },
  }},
  { start: eventTime("13:00"), end: eventTime("13:20"), banner: "Encerramento e sorteios — Keynote final", room: "Auditório" },
];
