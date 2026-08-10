"use client";

import { useEffect, useRef, useState } from "react";
import { type MotionValue } from "motion/react";
import { LOGO_NOTEXT_OUTLINE } from "./logoNoTextOutline";

type Ripple = {
  id: number;
  rot: number; // logo rotation captured at birth
  delay: number; // negative = pre-aged (for the initial fill)
};

const COUNT = 8;
const DURATION = 20; // seconds — must match the CSS animation in globals.css

/**
 * Emits ripples from the logo. Rendered INSIDE the logo block, so the ripples
 * move (and fade) with the logo. Each ripple captures the logo's rotation at
 * the moment it's created and keeps it, so its shape matches the logo's
 * orientation at birth while newer ripples reflect the logo's newer rotation.
 * A staggered pre-fill makes the field full on load.
 */
export default function LogoRippleEmitter({
  rotation,
}: {
  rotation: MotionValue<number>;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const spawn = (delay: number) => {
      const id = nextId.current++;
      setRipples((rs) => [...rs, { id, rot: rotation.get(), delay }]);
    };
    for (let i = 0; i < COUNT; i++) spawn(-(i * DURATION) / COUNT);
    const iv = setInterval(() => spawn(0), (DURATION / COUNT) * 1000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remove = (id: number) =>
    setRipples((rs) => rs.filter((r) => r.id !== id));

  const { width, height, path } = LOGO_NOTEXT_OUTLINE;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute inset-0"
          style={{ transform: `rotate(${r.rot}deg)` }}
        >
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="logo-ripple-svg"
            style={{ animationDelay: `${r.delay}s` }}
            onAnimationEnd={() => remove(r.id)}
          >
            <path
              d={path}
              fill="none"
              stroke="#5C1EE4"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
