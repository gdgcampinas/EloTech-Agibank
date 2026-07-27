/**
 * Dados do evento. Único lugar a editar quando a programação mudar.
 * id de cada trilha precisa bater com a variável CSS --<id> em styles.css.
 */
const EVENT = {
  name: "EloTech",
  date: "2026-08-01", // America/Sao_Paulo (UTC-3, sem horário de verão)
  timezone: "America/Sao_Paulo",
  utcOffset: "-03:00",
  venue: "Agi Campus, Campinas/SP",
  // PROD = false: agenda mostra horário/trilha, esconde palestrante e título.
  // Vira true no dia de revelar o line-up. Pra testar revelado sem mudar
  // aqui, abra localmente com ?lineup=1 na URL (modo DEV).
  lineupRevealed: false,
};

const TRACKS = [
  { id: "ia", label: "IA", shortLabel: "IA" },
  { id: "webdata", label: "Front-end / Back-end / Data", shortLabel: "Front/Back/Data" },
  { id: "mentoring", label: "Mentoring & Growth", shortLabel: "Mentoring & Growth" },
];

function eventTime(hhmm) {
  return new Date(`${EVENT.date}T${hhmm}:00${EVENT.utcOffset}`);
}

const SCHEDULE = [
  { start: eventTime("08:00"), end: eventTime("08:30"), banner: "Credenciamento — Full Evento" },
  { start: eventTime("08:30"), end: eventTime("08:50"), banner: "Apresentação GDG Campinas + agibank" },
  { start: eventTime("09:00"), end: eventTime("09:35"), talks: {
      ia: { speaker: "agibank", title: "" },
      webdata: { speaker: "Kevin Uehara", title: "Exploring Google's AI ecosystem for the modern web" },
      mentoring: { speaker: "agibank", title: "" },
  }},
  { start: eventTime("09:40"), end: eventTime("10:15"), talks: {
      ia: { speaker: "Fabio Baldin", title: "Da ideia ao MVP antes do café acabar. Como a IA muda o que vem antes do código." },
      webdata: { speaker: "Vinicius Pivetta", title: "Como a IA generativa está mudando o trabalho do engenheiro de dados" },
      mentoring: { speaker: "Helson Carlos dos Santos", title: "Como formar o novo desenvolvedor sênior em tempos de IA" },
  }},
  { start: eventTime("10:20"), end: eventTime("10:55"), talks: {
      ia: { speaker: "Toshi Ossada", title: "Vamos falar de Inteligência Artificial? Desenvolvendo apps inteligentes com Flutter e Gemini" },
      webdata: { speaker: "Beatriz Rodrigues", title: "Data Power: como os dados moldam o mundo (e a sua carreira)" },
      mentoring: { speaker: "Jessé Freitas", title: "O próximo capítulo da Engenharia" },
  }},
  { start: eventTime("11:00"), end: eventTime("11:35"), banner: "Pausa / Intervalo" },
  { start: eventTime("11:40"), end: eventTime("12:15"), talks: {
      ia: { speaker: "Guilherme H Silva", title: "Domando Multi-Agentes em Go com Phoenix" },
      webdata: { speaker: "Ghabryel Henrique Ferreira e Almeida", title: "Arquitetura Limpa no Frontend: escalando aplicações para o mundo real" },
      mentoring: { speaker: "Marco Ollivier", title: "Toda startup começa com gambiarra, e isso pode ser uma ótima decisão" },
  }},
  { start: eventTime("12:20"), end: eventTime("12:55"), talks: {
      ia: { speaker: "Leonardo Veri", title: "Clareza: a verdadeira oportunidade da Inteligência Artificial" },
      webdata: { speaker: "Larissa Azevedo", title: "Front-end é o novo Full Stack? A evolução que transformou o papel do desenvolvedor" },
      mentoring: { speaker: "Alex Tavares Faiotto", title: "Como pensar como um arquiteto de software" },
  }},
  { start: eventTime("13:00"), end: eventTime("13:20"), banner: "Encerramento e sorteios — Keynote final" },
];
