"use client";

import { useEffect, useRef, useState } from "react";

type Ripple = { id: number; x: number; y: number };

/**
 * Variant 2 effect: spawns a soft expanding ripple wherever the cursor moves,
 * as if the pointer is gliding through water. A new ripple is emitted each time
 * the cursor travels a short distance, leaving a fading trail. Each ripple
 * removes itself once its (one-shot) CSS animation finishes.
 */
export default function MouseRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const SPACING = 16; // px the cursor must travel before spawning another

    const onMove = (e: PointerEvent) => {
      const prev = last.current;
      if (prev) {
        const dist = Math.hypot(e.clientX - prev.x, e.clientY - prev.y);
        if (dist < SPACING) return;
      }
      last.current = { x: e.clientX, y: e.clientY };
      const id = nextId.current++;
      setRipples((rs) => [...rs, { id, x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const remove = (id: number) =>
    setRipples((rs) => rs.filter((r) => r.id !== id));

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="mouse-ripple"
          style={{ left: r.x, top: r.y }}
          onAnimationEnd={() => remove(r.id)}
        />
      ))}
    </div>
  );
}
