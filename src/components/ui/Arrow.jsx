const ROTATION = { "up-right": 0, right: 45, down: 135, left: 225, up: -45 };

export default function Arrow({ className = "", direction = "up-right" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <g transform={`rotate(${ROTATION[direction]} 8 8)`}>
        <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.25" />
      </g>
    </svg>
  );
}
