/**
 * Bootstrap: liga os módulos (agenda, filtro, status ao vivo) aos dados
 * definidos em schedule.js. Trocar de evento = trocar só schedule.js.
 */
/**
 * Overrides de URL pra testar em DEV sem tocar em schedule.js (PROD real):
 *   ?demo=2026-08-01T09:50  → simula a hora do evento (ativa "ao vivo agora")
 *   ?lineup=1                → força mostrar palestrante/título mesmo com
 *                              EVENT.lineupRevealed=false
 */
function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function resolveNow() {
  const demo = getParam("demo");
  if (!demo) return () => new Date();
  const fixedNow = new Date(`${demo}:00${EVENT.utcOffset}`);
  return () => fixedNow;
}

function resolveReveal() {
  return getParam("lineup") === "1" ? true : EVENT.lineupRevealed;
}

function warnIfDemoMode() {
  if (!getParam("demo")) return;
  const banner = document.createElement("div");
  banner.textContent = "⚠️ MODO TESTE — data simulada, não é o horário real do evento";
  banner.style.cssText = "background:#ea4335;color:#fff;text-align:center;font-size:.75rem;font-weight:700;padding:6px;position:sticky;top:0;z-index:100";
  document.body.prepend(banner);
}

function initApp() {
  warnIfDemoMode();
  const reveal = resolveReveal();
  const tabsEl = document.querySelector(".tabs");

  renderLegend(TRACKS, document.querySelector(".tracks-legend"));
  renderTabs(TRACKS, tabsEl);
  renderAgenda(SCHEDULE, TRACKS, EVENT.timezone, document.getElementById("agenda"), { reveal });
  initTrackFilter(tabsEl);

  const statusSectionEl = document.getElementById("status");
  const stickyEl = document.getElementById("stickyStatus");
  initStickyStatus(statusSectionEl, stickyEl);

  const liveStatus = createLiveStatus({
    schedule: SCHEDULE,
    tracks: TRACKS,
    event: EVENT,
    reveal,
    elements: {
      statusCard: document.getElementById("statusCard"),
      statusTitle: document.getElementById("statusTitle"),
      statusMain: document.getElementById("statusMain"),
      statusSub: document.getElementById("statusSub"),
      liveTracks: document.getElementById("liveTracks"),
      stickyTxt: document.getElementById("stickyTxt"),
      stickyPulse: document.getElementById("stickyPulse"),
    },
    now: resolveNow(),
  });

  liveStatus.tick();
  setInterval(liveStatus.tick, 15000);
}

// loader.js injeta este script depois que o DOM já está pronto
// (document.head.appendChild acontece após o parse do body), então
// não há DOMContentLoaded pra esperar — roda direto.
initApp();
