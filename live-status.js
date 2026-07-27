/**
 * Feature: "ao vivo agora" — contagem regressiva, palestras em andamento,
 * intervalo e encerramento. Roda sozinha via setInterval, recalculando
 * a cada tick a partir da hora real. Nada aqui é específico do EloTech:
 * recebe schedule/tracks/event por parâmetro.
 */
function pad(n) {
  return String(n).padStart(2, "0");
}

function createLiveStatus({ schedule, tracks, event, elements, now = () => new Date(), reveal = true }) {
  const { statusCard, statusTitle, statusMain, statusSub, liveTracks, stickyTxt, stickyPulse } = elements;

  function setLive(isLive) {
    statusCard.classList.toggle("live", isLive);
    stickyPulse.style.display = isLive ? "inline-block" : "none";
    statusTitle.innerHTML = isLive ? '<span class="pulse"></span>Ao vivo agora' : "Status";
  }

  function clearActiveSlot() {
    document.querySelectorAll(".slot.active").forEach(el => el.classList.remove("active"));
  }

  function renderCountdown(now, first) {
    const diff = first - now;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    setLive(false);
    statusTitle.textContent = "Contagem regressiva";
    statusMain.textContent = days > 0
      ? `Faltam ${days} dia${days !== 1 ? "s" : ""} para o ${event.name}`
      : `Começa em ${pad(hours)}h${pad(mins)}min`;
    statusSub.textContent = `${formatDate(first, event.timezone)} · ${event.venue}`;
    liveTracks.innerHTML = "";
    stickyTxt.textContent = statusMain.textContent;
  }

  function renderEnded() {
    setLive(false);
    statusTitle.textContent = "Encerrado";
    statusMain.textContent = `Valeu por participar do ${event.name}! 💙`;
    statusSub.textContent = "Até a próxima edição.";
    liveTracks.innerHTML = "";
    stickyTxt.textContent = statusMain.textContent;
  }

  function renderActiveSlot(slot, index) {
    document.querySelector(`.slot[data-index="${index}"]`)?.classList.add("active");
    const range = `${formatEventTime(slot.start, event.timezone)} — ${formatEventTime(slot.end, event.timezone)}`;

    if (slot.banner) {
      statusMain.textContent = slot.banner;
      statusSub.textContent = range;
      liveTracks.innerHTML = "";
      stickyTxt.textContent = slot.banner;
      return;
    }

    statusMain.textContent = "Palestras em andamento";
    statusSub.textContent = range;
    liveTracks.innerHTML = tracks.map(track => trackCardMarkup(track, slot.talks[track.id], "live", { reveal })).join("");
    stickyTxt.textContent = reveal
      ? `Agora: ${tracks.map(track => slot.talks[track.id].speaker).join(" · ")}`
      : "Agora: confira sua trilha";
  }

  function renderBetweenSlots(now) {
    const next = schedule.find(s => now < s.start);
    statusMain.textContent = "Intervalo entre palestras";
    statusSub.textContent = next ? `Próximo bloco às ${formatEventTime(next.start, event.timezone)}` : "";
    liveTracks.innerHTML = "";
    stickyTxt.textContent = next ? `Intervalo — próximo bloco às ${formatEventTime(next.start, event.timezone)}` : "Intervalo";
  }

  function tick() {
    const currentTime = now();
    clearActiveSlot();

    const first = schedule[0].start;
    const last = schedule[schedule.length - 1].end;

    if (currentTime < first) return renderCountdown(currentTime, first);
    if (currentTime > last) return renderEnded();

    setLive(true);
    const activeIndex = schedule.findIndex(s => currentTime >= s.start && currentTime < s.end);
    if (activeIndex >= 0) renderActiveSlot(schedule[activeIndex], activeIndex);
    else renderBetweenSlots(currentTime);
  }

  return { tick };
}

function formatDate(date, timezone) {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: timezone })
    + " · " + formatEventTime(date, timezone);
}

function initStickyStatus(statusSectionEl, stickyEl) {
  new IntersectionObserver(
    ([entry]) => stickyEl.classList.toggle("show", !entry.isIntersecting),
    { threshold: 0 }
  ).observe(statusSectionEl);
}
