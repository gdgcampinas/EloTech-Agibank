/**
 * Bootstrap: liga os módulos (agenda, filtro, status ao vivo) aos dados
 * definidos em schedule.js. Trocar de evento = trocar só schedule.js.
 */
document.addEventListener("DOMContentLoaded", () => {
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
  });

  liveStatus.tick();
  setInterval(liveStatus.tick, 15000);
});
