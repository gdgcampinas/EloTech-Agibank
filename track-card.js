/**
 * Único template de "card de trilha" — usado na agenda completa e no
 * painel "acontecendo agora". Tudo por parâmetro, nada duplicado:
 *   reveal    → false esconde palestrante/título (mock "Em breve")
 *   live      → adiciona a tag "AGORA" pulsante
 *   timeRange → texto "HH:MM — HH:MM" pro rodapé do card (opcional)
 */
const HIDDEN_SPEAKER_LABEL = "Em breve";

function trackCardMarkup(track, data, { reveal = true, live = false, timeRange = "", slotIndex = null } = {}) {
  const speaker = reveal ? data.speaker : HIDDEN_SPEAKER_LABEL;
  const title = reveal ? data.title : "";
  const room = reveal ? track.room : "";

  const nowTag = live
    ? `<span class="now-tag"><span class="dot"></span>AGORA</span>`
    : "";

  const footItems = [timeRange, room].filter(Boolean);
  const foot = footItems.length
    ? `<div class="foot">${footItems.map((item, i) => i === footItems.length - 1 && room
        ? `<span class="room-tag">${item}</span>`
        : `<span class="time">${item}</span>`).join("")}</div>`
    : "";

  const clickable = slotIndex !== null ? ` data-slot-index="${slotIndex}" tabindex="0" role="button"` : "";

  return `
    <div class="talk" data-track="${track.id}"${clickable}>
      <div class="track-row">
        <span class="track-label"><span class="dot" style="background:var(--${track.id})"></span>${track.label}</span>
        ${nowTag}
      </div>
      ${title ? `<div class="title">${title}</div>` : ""}
      <div class="speaker">${speaker}</div>
      ${foot}
    </div>`;
}

/**
 * Conteúdo do modal de detalhe — mesma trilha/dados do card, formato
 * maior com descrição completa. reveal segue a mesma regra do card.
 */
function talkDetailMarkup(track, data, { reveal = true, timeRange = "", room = "" } = {}) {
  const speaker = reveal ? data.speaker : HIDDEN_SPEAKER_LABEL;
  const title = reveal ? data.title : "Palestra a confirmar";
  const description = reveal && data.description ? data.description : "";
  const roomLabel = reveal ? room : "";

  const metaItems = [
    timeRange && `<span>${timeRange}</span>`,
    roomLabel && `<span class="room-tag">${roomLabel}</span>`,
  ].filter(Boolean).join("");

  return `
    <div class="detail" data-track="${track.id}">
      <span class="track-label"><span class="dot" style="background:var(--${track.id})"></span>${track.label}</span>
      <h3 class="detail-title">${title}</h3>
      ${description ? `<p class="detail-desc">${description}</p>` : ""}
      ${metaItems ? `<div class="detail-meta">${metaItems}</div>` : ""}
      <div class="detail-speaker">${speaker}</div>
    </div>`;
}

/**
 * Sessão combinada (credenciamento, pausa, encerramento) — mesmo bloco
 * usado na agenda completa e no hero "ao vivo agora".
 */
function bannerMarkup(slot) {
  return `<div class="banner"><div class="t">${slot.banner}</div>${slot.room ? `<div class="r">${slot.room}</div>` : ""}</div>`;
}
