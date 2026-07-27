/**
 * PROD — dados mock. Este é o arquivo publicado no GitHub Pages.
 * O line-up real fica só em schedule.dev.js, que roda na sua máquina
 * e nunca é commitado (veja .gitignore). Quando chegar a hora de
 * revelar os palestrantes de verdade, troque os dados aqui por
 * schedule.dev.js e suba — não precisa mexer em mais nada.
 * id de cada trilha precisa bater com a variável CSS --<id> em styles.css.
 */
const EVENT = {
  name: "EloTech",
  date: "2026-08-01", // America/Sao_Paulo (UTC-3, sem horário de verão)
  timezone: "America/Sao_Paulo",
  utcOffset: "-03:00",
  venue: "Agi Campus, Campinas/SP",
  address: "Rua Sergio Fernandes Borges Soares, 1000, Campinas, SP",
  lineupRevealed: true, // dados abaixo já são mock, não precisa esconder
};

// room/mc em branco = card não mostra a linha (ver track-card.js).
const TRACKS = [
  { id: "ia", label: "IA", shortLabel: "IA", room: "Sala Toy Story", mc: "Camila Duarte" },
  { id: "webdata", label: "Front-end / Back-end / Data", shortLabel: "Front/Back/Data", room: "Sala Detona Ralph", mc: "Diego Nunes" },
  { id: "mentoring", label: "Mentoring & Growth", shortLabel: "Mentoring & Growth", room: "Sala Up: Altas Aventuras", mc: "Fernanda Lopes" },
];

function eventTime(hhmm) {
  return new Date(`${EVENT.date}T${hhmm}:00${EVENT.utcOffset}`);
}

const MOCK_TALK = { speaker: "Em breve", title: "Palestrante e tema a confirmar" };

const SCHEDULE = [
  { start: eventTime("08:00"), end: eventTime("08:30"), banner: "Credenciamento — Full Evento", room: "Hall" },
  { start: eventTime("08:30"), end: eventTime("08:50"), banner: "Apresentação GDG Campinas + agibank", room: "Auditório" },
  { start: eventTime("09:00"), end: eventTime("09:35"), talks: { ia: MOCK_TALK, webdata: MOCK_TALK, mentoring: MOCK_TALK } },
  { start: eventTime("09:40"), end: eventTime("10:15"), talks: { ia: MOCK_TALK, webdata: MOCK_TALK, mentoring: MOCK_TALK } },
  { start: eventTime("10:20"), end: eventTime("10:55"), talks: { ia: MOCK_TALK, webdata: MOCK_TALK, mentoring: MOCK_TALK } },
  { start: eventTime("11:00"), end: eventTime("11:35"), banner: "Pausa / Intervalo" },
  { start: eventTime("11:40"), end: eventTime("12:15"), talks: { ia: MOCK_TALK, webdata: MOCK_TALK, mentoring: MOCK_TALK } },
  { start: eventTime("12:20"), end: eventTime("12:55"), talks: { ia: MOCK_TALK, webdata: MOCK_TALK, mentoring: MOCK_TALK } },
  { start: eventTime("13:00"), end: eventTime("13:20"), banner: "Encerramento e sorteios — Keynote final", room: "Auditório" },
];
