import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

// ========================================================
// ✦ RADIAL KNOB STAT — volume-knob / HUD gauge style counter
// Draws N radial tick marks around a circle. As the center number
// counts up (0 → value), ticks light up proportionally and the
// animation naturally "stops" once the counter reaches its target —
// there's no separate progress state to keep in sync, activeTicks is
// just derived from the live count on every frame.
// ========================================================
const RadialKnobStat = ({
  value,
  maxValue = 100,
  suffix = "%",
  ticks = 44,
  gapDegrees = 26,
  size = 96,
  duration = 1.8,
}: {
  value: number;
  maxValue?: number;
  suffix?: string;
  ticks?: number;
  gapDegrees?: number;
  size?: number;
  duration?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  // Ticks are deliberately loose/approximate against the counter rather than
  // a strict 1:1 mapping — with fewer, longer, more spaced-out ticks (per the
  // reference image), a tight per-tick sync reads as jittery/mechanical.
  // Rounding against the tick count keeps it visually settling in step with
  // the number without needing exact proportional precision.
  const activeTicks = Math.round((count / maxValue) * ticks);

  const radius = size / 2;
  const tickInner = radius + 10;
  const tickOuter = radius + 34;
  const canvasSize = tickOuter * 2;
  const cx = tickOuter;
  const cy = tickOuter;

  const startAngle = gapDegrees / 2;
  const sweep = 360 - gapDegrees;

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center shrink-0"
      style={{ width: canvasSize, height: canvasSize }}
    >
      <svg
        width={canvasSize}
        height={canvasSize}
        viewBox={`0 0 ${canvasSize} ${canvasSize}`}
        className="absolute inset-0"
      >
        {Array.from({ length: ticks }).map((_, i) => {
          const angleDeg = startAngle + (sweep / (ticks - 1)) * i;
          const theta = (angleDeg * Math.PI) / 180;
          // theta = 0 at top (12 o'clock), increases clockwise
          const x1 = cx + tickInner * Math.sin(theta);
          const y1 = cy - tickInner * Math.cos(theta);
          const x2 = cx + tickOuter * Math.sin(theta);
          const y2 = cy - tickOuter * Math.cos(theta);
          const isActive = i < activeTicks;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isActive ? "#111111" : "#d4d4d4"}
              strokeWidth={isActive ? 2 : 1.4}
              strokeLinecap="round"
              style={{ transition: "stroke 0.15s linear" }}
            />
          );
        })}
      </svg>

      <div
        className="relative flex items-center justify-center rounded-full bg-black text-white"
        style={{ width: size * 0.70, height: size * 0.70 }}
      >
        <span className="text-lg font-figtree font-semibold tabular-nums">
          {count}
          {suffix}
        </span>
      </div>
    </div>
  );
};

export default RadialKnobStat;