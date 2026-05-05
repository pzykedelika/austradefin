interface GridPatternProps {
  className?: string;
  variant?: "light" | "dark";
  position?: "right" | "left" | "center";
}

export default function ConcentricPattern({
  className = "",
  variant = "dark",
  position = "right",
}: GridPatternProps) {
  const strokeColor =
    variant === "dark" ? "rgba(255,255,255,0.06)" : "rgba(10,22,40,0.05)";

  const positionClass =
    position === "right"
      ? "right-0 inset-y-0 w-2/3"
      : position === "left"
      ? "left-0 inset-y-0 w-2/3"
      : "inset-0";

  const spacing = 40;
  const patternId = `grid-pattern-${variant}-${position}`;
  const fadeId = `grid-fade-${variant}-${position}`;

  // Fade direction — for "right" position, fade in from left (transparent) to right (opaque)
  const fadeStart = position === "left" ? { x1: "100%", x2: "0%" } : { x1: "0%", x2: "100%" };

  return (
    <div
      className={`absolute pointer-events-none ${positionClass} ${className}`}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={patternId}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
            />
          </pattern>
          <linearGradient
            id={fadeId}
            x1={fadeStart.x1}
            y1="0%"
            x2={fadeStart.x2}
            y2="0%"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="40%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id={`${fadeId}-mask`}>
            <rect width="100%" height="100%" fill={`url(#${fadeId})`} />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          mask={`url(#${fadeId}-mask)`}
        />
      </svg>
    </div>
  );
}
