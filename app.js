/**
 * Bootstrap: liga os módulos (agenda, filtro, status ao vivo) aos dados
 * definidos em schedule.js. Trocar de evento = trocar só schedule.js.
 */
/**
 * Testar o "ao vivo agora" sem esperar o dia do evento:
 * abra o site com ?demo=2026-08-01T09:50 na URL (data+hora local do evento).
 */
function resolveNow() {
  const demo = new URLSearchParams(location.search).get("demo");
  if (!demo) return () => new Date();
  const fixedNow = new Date(`${demo}:00${EVENT.utcOffset}`);
  return () => fixedNow;
}

function warnIfDemoMode() {
  if (!new URLSearchParams(location.search).get("demo")) return;
  const banner = document.createElement("div");
  banner.textContent = "⚠️ MODO TESTE — data simulada, não é o horário real do evento";
  banner.style.cssText = "background:#ea4335;color:#fff;text-align:center;font-size:.75rem;font-weight:700;padding:6px;position:sticky;top:0;z-index:100";
  document.body.prepend(banner);
}

document.addEventListener("DOMContentLoaded", () => {
  warnIfDemoMode();
  const tabsEl = document.querySelector(".tabs");

  renderLegend(TRACKS, document.querySelector(".tracks-legend"));
  renderTabs(TRACKS, tabsEl);
  renderAgenda(SCHEDULE, TRACKS, EVENT.timezone, document.getElementById("agenda"));
  initTrackFilter(tabsEl);

  const statusSectionEl = document.getElementById("status");
  const stickyEl = document.getElementById("stickyStatus");
  initStickyStatus(statusSectionEl, stickyEl);

  const liveStatus = createLiveStatus({
    schedule: SCHEDULE,
    tracks: TRACKS,
    event: EVENT,
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
});
