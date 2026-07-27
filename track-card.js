/**
 * Único template pra "card de trilha" — usado tanto na agenda completa
 * quanto no card "ao vivo agora". Muda só o variant, nunca duplica markup.
 */
const CARD_VARIANTS = {
  agenda: { card: "talk", label: "track-label", speaker: "speaker", title: "title" },
  live: { card: "live-track", label: "tname", speaker: "tspeaker", title: "ttitle" },
};

function trackCardMarkup(track, data, variant = "agenda") {
  const cls = CARD_VARIANTS[variant];
  const accent = variant === "live" ? ` style="border-left-color:var(--${track.id})"` : "";
  return `
    <div class="${cls.card}" data-track="${track.id}"${accent}>
      <div class="${cls.label}">${track.label}</div>
      <div class="${cls.speaker}">${data.speaker}</div>
      ${data.title ? `<div class="${cls.title}">${data.title}</div>` : ""}
    </div>`;
}
