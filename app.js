/**
 * Bootstrap: liga os módulos (header, agenda, filtro, status ao vivo)
 * aos dados definidos em schedule.js/schedule.dev.js. Trocar de evento
 * ou de sala/MC = trocar só esses dois arquivos, nada aqui.
 */

/**
 * Overrides de URL pra testar em DEV sem tocar em schedule.js (PROD real):
 *   ?demo=2026-08-01T09:50     → simula a hora do evento (ativa "ao vivo agora")
 *   ?demo=2026-08-01T09:50:30  → segundos são opcionais
 *   ?lineup=1                   → força mostrar palestrante/título mesmo com
 *                                 EVENT.lineupRevealed=false
 */
function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

/** null se `demo` não veio na URL ou não é uma data válida. */
function parseDemoDate(demo) {
  if (!demo) return null;
  const withSeconds = /T\d{2}:\d{2}:\d{2}/.test(demo) ? demo : `${demo}:00`;
  const date = new Date(`${withSeconds}${EVENT.utcOffset}`);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * O relógio simulado continua avançando normalmente a partir do
 * instante em ?demo= — fixa um offset em vez de congelar num ponto só,
 * pra dar pra assistir uma troca de sessão acontecer ao vivo de verdade.
 */
function resolveNow() {
  const demoStart = parseDemoDate(getParam("demo"));
  if (!demoStart) return () => new Date();
  const offsetMs = demoStart.getTime() - Date.now();
  return () => new Date(Date.now() + offsetMs);
}

function resolveReveal() {
  return getParam("lineup") === "1" ? true : EVENT.lineupRevealed;
}

function warnIfDemoMode() {
  const demo = getParam("demo");
  if (!demo) return;
  const valid = parseDemoDate(demo) !== null;
  const banner = document.createElement("div");
  banner.textContent = valid
    ? "⚠️ MODO TESTE — data simulada, não é o horário real do evento"
    : `⚠️ ?demo="${demo}" inválido — mostrando horário real. Formato: AAAA-MM-DDTHH:MM`;
  banner.style.cssText = "background:#ea4335;color:#fff;text-align:center;font-size:.75rem;font-weight:700;padding:6px;position:sticky;top:0;z-index:100";
  document.body.prepend(banner);
}

/** Único lugar que sabe montar URLs do Google Maps a partir de um endereço. */
function googleMapsUrls(address) {
  const q = encodeURIComponent(address);
  return {
    directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
    embed: `https://www.google.com/maps?q=${q}&output=embed`,
  };
}

function renderHeaderMeta(event, schedule, mountEl) {
  const start = hourLabel(schedule[0].start, event.timezone);
  const end = hourLabel(schedule[schedule.length - 1].end, event.timezone);
  const dateLabel = schedule[0].start.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: event.timezone });
  const { directions } = googleMapsUrls(event.address);
  mountEl.innerHTML = `
    <span class="when">${dateLabel}</span>
    <span class="sep">·</span>
    <span class="when">das ${start} às ${end}</span>
    <span class="sep">·</span>
    <a class="venue-link" href="${directions}" target="_blank" rel="noopener">${event.venue} · como chegar</a>`;
}

function renderVenue(event, mountEl) {
  // mapa externo (endereço/entrada) pode; planta interna do prédio, não.
  const { directions, embed } = googleMapsUrls(event.address);
  mountEl.innerHTML = `
    <div class="venue-info">
      <div class="label">Local</div>
      <div class="addr">${event.venue}<br>${event.address}</div>
      <a class="go" href="${directions}" target="_blank" rel="noopener">Como chegar</a>
      <div class="venue-qr">
        <img src="qrcode.png" alt="QR code para esta agenda" width="96" height="96">
        <span>Aponte a câmera para abrir a agenda</span>
      </div>
    </div>
    <div class="venue-map">
      <iframe src="${embed}" loading="lazy" title="Mapa até ${event.venue}"></iframe>
    </div>`;
}

function initApp() {
  warnIfDemoMode();
  const reveal = resolveReveal();

  renderHeaderMeta(EVENT, SCHEDULE, document.getElementById("headerMeta"));
  renderVenue(EVENT, document.getElementById("venue"));

  const tabsEl = document.querySelector(".tabs");
  const agendaEl = document.getElementById("agenda");
  renderLegend(TRACKS, document.querySelector(".tracks-legend"));
  renderTabs(TRACKS, tabsEl);
  renderAgenda(SCHEDULE, TRACKS, EVENT.timezone, agendaEl, { reveal });
  initTrackFilter(tabsEl, agendaEl);

  initStickyStatus(document.getElementById("hero"), document.getElementById("stickyStatus"));

  const modal = createTalkModal(document.getElementById("talkModal"), document.getElementById("talkModalContent"));
  initTalkDetails(document.body, { schedule: SCHEDULE, tracks: TRACKS, timezone: EVENT.timezone, reveal, modal });

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
