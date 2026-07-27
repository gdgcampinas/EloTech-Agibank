/**
 * Bootstrap: liga os módulos (header, agenda, filtro, status ao vivo)
 * aos dados definidos em schedule.js/schedule.dev.js. Trocar de evento
 * ou de sala/MC = trocar só esses dois arquivos, nada aqui.
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

function renderHeaderMeta(event, schedule, mountEl) {
  const start = formatEventTime(schedule[0].start, event.timezone);
  const end = formatEventTime(schedule[schedule.length - 1].end, event.timezone);
  const dateLabel = schedule[0].start.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: event.timezone });
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.address)}`;
  mountEl.innerHTML = `
    <span class="when">${dateLabel}</span>
    <span class="sep">·</span>
    <span class="when">${start} — ${end}</span>
    <span class="sep">·</span>
    <span class="venue">${event.venue}</span>
    <a href="${directionsUrl}" target="_blank" rel="noopener">como chegar</a>`;
}

function renderVenue(event, mountEl) {
  const mapQuery = encodeURIComponent(event.address);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
  mountEl.innerHTML = `
    <div class="venue-info">
      <div class="label">Local</div>
      <div class="addr">${event.venue}<br>${event.address}</div>
      <a class="go" href="${directionsUrl}" target="_blank" rel="noopener">Como chegar</a>
    </div>
    <div class="venue-map">
      <iframe src="https://www.google.com/maps?q=${mapQuery}&output=embed" loading="lazy" title="Mapa até ${event.venue}"></iframe>
    </div>`;
}

function initApp() {
  warnIfDemoMode();
  const reveal = resolveReveal();

  renderHeaderMeta(EVENT, SCHEDULE, document.getElementById("headerMeta"));
  renderVenue(EVENT, document.getElementById("venue"));

  const tabsEl = document.querySelector(".tabs");
  renderLegend(TRACKS, document.querySelector(".tracks-legend"));
  renderTabs(TRACKS, tabsEl);
  renderAgenda(SCHEDULE, TRACKS, EVENT.timezone, document.getElementById("agenda"), { reveal });
  initTrackFilter(tabsEl);

  initStickyStatus(document.getElementById("hero"), document.getElementById("stickyStatus"));

  const liveStatus = createLiveStatus({
    schedule: SCHEDULE,
    tracks: TRACKS,
    event: EVENT,
    reveal,
    elements: {
      statusPill: document.getElementById("statusPill"),
      hero: document.getElementById("hero"),
      stickyTxt: document.getElementById("stickyTxt"),
      stickyPulse: document.getElementById("stickyPulse"),
    },
    now: resolveNow(),
  });

  liveStatus.tick();
  setInterval(liveStatus.tick, 1000);
}

// carregado depois que o DOM já está pronto (script no fim do body) — roda direto.
initApp();
