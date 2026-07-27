/**
 * Feature: agenda completa + legenda + abas de filtro por trilha.
 * Tudo injetado por parâmetro (schedule, tracks) — nada hardcoded aqui,
 * então essa mesma função serve pra qualquer lista de trilhas/horários.
 */
function formatEventTime(date, timezone) {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: timezone });
}

function renderLegend(tracks, mountEl) {
  mountEl.innerHTML = tracks
    .map(track => `<span><i class="dot" style="background:var(--${track.id})"></i>${track.label}</span>`)
    .join("");
}

function renderTabs(tracks, mountEl) {
  const allTab = `<button class="tab active" data-track="all">Todas as trilhas</button>`;
  const trackTabs = tracks
    .map(track => `<button class="tab" data-track="${track.id}">${track.shortLabel}</button>`)
    .join("");
  mountEl.innerHTML = allTab + trackTabs;
}

function renderAgenda(schedule, tracks, timezone, mountEl) {
  mountEl.innerHTML = schedule
    .map((slot, index) => {
      const time = formatEventTime(slot.start, timezone);
      const body = slot.banner
        ? `<div class="banner">${slot.banner}</div>`
        : `<div class="talks" data-view="all">${tracks.map(track => trackCardMarkup(track, slot.talks[track.id], "agenda")).join("")}</div>`;
      return `<div class="slot" data-index="${index}"><div class="slot-time">${time}</div>${body}</div>`;
    })
    .join("");
}

function initTrackFilter(tabsEl) {
  tabsEl.addEventListener("click", event => {
    const btn = event.target.closest(".tab");
    if (!btn) return;

    tabsEl.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const track = btn.dataset.track;
    document.querySelectorAll(".talks").forEach(t => (t.dataset.view = track));
    document.querySelectorAll(".talk").forEach(card => {
      card.classList.toggle("shown", track === "all" || card.dataset.track === track);
    });
  });
}
