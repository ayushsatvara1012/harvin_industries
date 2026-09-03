// Technical-drawing style isometric line grid — three line families forming a
// triangular blueprint pattern, evoking an engineering drawing of the
// machines the site sells. Deterministic (no client hydration concerns) since
// this only ever renders as static markup.

const W = 1200;
const H = 600;
const SPACING = 60;

type Line = { x1: number; y1: number; x2: number; y2: number; opacity: number };

function buildGrid(): Line[] {
  const lines: Line[] = [];

  // Offset by half a spacing so the verticals land on the diagonals'
  // crossing points instead of straddling them.
  const vShift = SPACING / 2;
  for (let x = -SPACING; x <= W + SPACING; x += SPACING) {
    lines.push({ x1: x - vShift, y1: -40, x2: x - vShift, y2: H + 40, opacity: 0.12 });
  }

  const rad30 = Math.PI / 6;
  const dx = Math.cos(rad30) * 1800;
  const dyDown = Math.sin(rad30) * 1800;

  for (let x0 = -900; x0 <= W + 900; x0 += SPACING) {
    lines.push({ x1: x0 - dx, y1: -dyDown, x2: x0 + dx, y2: dyDown, opacity: 0.14 });
    lines.push({ x1: x0 - dx, y1: dyDown, x2: x0 + dx, y2: -dyDown, opacity: 0.14 });
  }

  return lines;
}

const GRID = buildGrid();

export function IsometricLines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="var(--color-brand-cream)" strokeWidth={1}>
        {GRID.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            opacity={line.opacity}
          />
        ))}
      </g>
    </svg>
  );
}
