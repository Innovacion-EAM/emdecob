import Link from "next/link";

type LogoProps = {
  light?: boolean;
  compact?: boolean;
  onClick?: () => void;
};

export function Logo({ light = false, compact = false, onClick }: LogoProps) {
  return (
    <Link href="/" className="brand" aria-label="EMDECOB, ir al inicio" onClick={onClick}>
      <span className="brand__mark" aria-hidden="true">
        E
      </span>
      <span>
        <span
          className="brand__word"
          style={light ? { color: "var(--white)" } : undefined}
        >
          EMDECOB
        </span>
        {!compact && <span className="brand__sub">Contact Center BPS</span>}
      </span>
    </Link>
  );
}
