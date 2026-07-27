/**
 * Único template pra "card de trilha" — usado tanto na agenda completa
 * quanto no card "ao vivo agora". Muda só o variant, nunca duplica markup.
 *
 * `reveal: false` esconde palestrante/título (linha do tempo continua visível).
 * Usado pra publicar a agenda sem entregar o line-up ainda.
 */
const CARD_VARIANTS = {
  agenda: { card: "talk", label: "track-label", speaker: "speaker", title: "title" },
  live: { card: "live-track", label: "tname", speaker: "tspeaker", title: "ttitle" },
};

const HIDDEN_SPEAKER_LABEL = "Em breve";

function trackCardMarkup(track, data, variant = "agenda", { reveal = true } = {}) {
  const cls = CARD_VARIANTS[variant];
  const accent = variant === "live" ? ` style="border-left-color:var(--${track.id})"` : "";
  const speaker = reveal ? data.speaker : HIDDEN_SPEAKER_LABEL;
  const title = reveal ? data.title : "";
  return `
    <div class="${cls.card}" data-track="${track.id}"${accent}>
      <div class="${cls.label}">${track.label}</div>
      <div class="${cls.speaker}">${speaker}</div>
      ${title ? `<div class="${cls.title}">${title}</div>` : ""}
    </div>`;
}
