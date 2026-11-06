export default function RollText({ children }) {
  return (
    <span className="roll">
      <span className="roll-inner">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}
