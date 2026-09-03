const BRICK_COLORS = [
  "#8f3620",
  "#b4442a",
  "#c65a3a",
  "#98371f",
  "#a8522f",
  "#7a3d2a",
  "#d4703f",
];

const BRICK_W = 64;
const BRICK_H = 28;
const GAP = 4;
const ROWS = 8;
const COLS = 10;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function BrickWallPattern({ className = "" }: { className?: string }) {
  const width = COLS * (BRICK_W + GAP);
  const height = ROWS * (BRICK_H + GAP);

  const bricks: { x: number; y: number; color: string }[] = [];
  for (let row = 0; row < ROWS; row++) {
    const offset = row % 2 === 0 ? 0 : -(BRICK_W + GAP) / 2;
    for (let col = -1; col < COLS + 1; col++) {
      bricks.push({
        x: offset + col * (BRICK_W + GAP),
        y: row * (BRICK_H + GAP),
        color: pick(BRICK_COLORS),
      });
    }
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {bricks.map((brick, i) => (
        <rect
          key={i}
          x={brick.x}
          y={brick.y}
          width={BRICK_W}
          height={BRICK_H}
          rx={2}
          fill={brick.color}
        />
      ))}
    </svg>
  );
}
