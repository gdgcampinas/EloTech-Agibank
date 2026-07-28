/**
 * Feature: modal de detalhe da palestra. Abre ao clicar num card
 * clicável (data-slot-index), busca os dados no schedule por índice +
 * trilha — não duplica nada do card, só formata maior via
 * talkDetailMarkup (track-card.js).
 */
function createTalkModal(modalEl, contentEl) {
  function open(track, data, meta) {
    contentEl.innerHTML = talkDetailMarkup(track, data, meta);
    modalEl.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    modalEl.hidden = true;
    document.body.style.overflow = "";
  }

  modalEl.addEventListener("click", event => {
    if (event.target.closest(".modal-close") || event.target.classList.contains("modal-backdrop")) close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !modalEl.hidden) close();
  });

  return { open, close };
}

/**
 * Delega clique em qualquer .talk[data-slot-index] dentro de rootEl
 * (agenda completa ou hero "ao vivo") e abre o modal com os dados reais
 * daquele slot/trilha — funciona pros dois sem duplicar handler.
 */
function initTalkDetails(rootEl, { schedule, tracks, timezone, reveal, modal }) {
  rootEl.addEventListener("click", event => {
    const card = event.target.closest(".talk[data-slot-index]");
    if (!card) return;
    openFromCard(card);
  });
  rootEl.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".talk[data-slot-index]");
    if (!card) return;
    event.preventDefault();
    openFromCard(card);
  });

  function openFromCard(card) {
    const slot = schedule[Number(card.dataset.slotIndex)];
    const track = tracks.find(t => t.id === card.dataset.track);
    if (!slot || !track || !slot.talks) return;
    modal.open(track, slot.talks[track.id], {
      reveal,
      timeRange: timeRangeLabel(slot, timezone),
      room: track.room,
    });
  }
}
