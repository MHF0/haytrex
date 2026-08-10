import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "@/hooks/use-motion";

interface CountUpProps {
  /** The final value to land on. */
  to: number;
  /** Value to start counting from. */
  from?: number;
  /** Length of the count in milliseconds. */
  duration?: number;
  /** Text placed directly after the number, e.g. "+" or "%". */
  suffix?: string;
  /** Text placed directly before the number, e.g. "$". */
  prefix?: string;
  /** Decimal places to display. */
  decimals?: number;
  className?: string;
}

/** Ease-out curve so the number decelerates as it approaches its target. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts up to a number once it scrolls into view. Visitors who prefer reduced
 * motion see the final value immediately.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1900,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(from + (to - from) * easeOut(progress));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, reduced, from, to, duration]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
