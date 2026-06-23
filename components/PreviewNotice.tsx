/* Slim banner marking the site as a work-in-progress preview. Remove before launch. */
export default function PreviewNotice() {
  return (
    <div className="preview-note" role="note">
      <span className="dot" aria-hidden="true" />
      <strong>Vorschau</strong> dieser Webseite · Inhalte, Bilder und Bezahlung sind noch Platzhalter.
    </div>
  );
}
