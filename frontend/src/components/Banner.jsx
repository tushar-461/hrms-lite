export default function Banner({ message, tone = "info", onClose }) {
  if (!message) return null;

  return (
    <div className={`banner banner-${tone}`} role="status">
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss message">
        x
      </button>
    </div>
  );
}
