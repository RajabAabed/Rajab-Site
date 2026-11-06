export default function Eyebrow({ index, children, className = "" }) {
  return (
    <p
      data-reveal="fade"
      className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-mute ${className}`}
    >
      <span className="tabular-nums">({index})</span>
      <span className="h-px w-8 bg-line" />
      <span>{children}</span>
    </p>
  );
}
