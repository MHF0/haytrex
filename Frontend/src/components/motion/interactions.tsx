import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "@/hooks/use-motion";

/** Anything that should make the cursor ring swell as it passes over. */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary';

/**
 * A soft accent ring that trails the pointer and grows over interactive
 * elements. The native cursor is deliberately left visible - this rides
 * behind it rather than replacing it, so nothing about clicking changes.
 */
export function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    // Ring position lags the pointer slightly, easing toward it each frame.
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      ring.classList.add("is-active");

      const overInteractive = (event.target as Element | null)?.closest?.(INTERACTIVE);
      ring.classList.toggle("is-hovering", Boolean(overInteractive));
    };

    const onLeave = () => ring.classList.remove("is-active");

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;
  return <div ref={ringRef} aria-hidden="true" className="cursor-ring" />;
}

/**
 * Plays a diagonal wipe across the viewport whenever the route changes, so
 * navigation reads as one continuous surface rather than a hard cut.
 */
export function RouteWipe() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    // Don't wipe on the initial paint - there is nothing to transition from.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reduced) return;

    setPlaying(true);
    const timer = window.setTimeout(() => setPlaying(false), 900);
    return () => window.clearTimeout(timer);
  }, [pathname, reduced]);

  if (!playing || reduced) return null;
  return <div aria-hidden="true" className="route-wipe" />;
}

/**
 * Emits a ripple from the pointer on primary actions. It listens once at the
 * document level and only reacts to elements carrying `.shine`, which already
 * clip their contents - so no arbitrary button gets its styles rewritten.
 */
export function ClickRipple() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const onPointerDown = (event: PointerEvent) => {
      const host = (event.target as Element | null)?.closest?.(".shine") as HTMLElement | null;
      if (!host) return;

      const rect = host.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      const ink = document.createElement("span");
      ink.className = "ripple-ink";
      ink.style.width = `${size}px`;
      ink.style.height = `${size}px`;
      ink.style.left = `${event.clientX - rect.left - size / 2}px`;
      ink.style.top = `${event.clientY - rect.top - size / 2}px`;
      ink.addEventListener("animationend", () => ink.remove());

      host.appendChild(ink);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [reduced]);

  return null;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#";

interface ScrambleProps {
  text: string;
  /** Milliseconds to wait after the text enters view before decoding. */
  delay?: number;
  /** Frames each character stays scrambled before locking in. */
  speed?: number;
  className?: string;
}

/**
 * Resolves a line of text out of scrambled characters, left to right, once it
 * scrolls into view. Announced to assistive tech as the finished string.
 */
export function ScrambleText({ text, delay = 0, speed = 2, className }: ScrambleProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? text : "");

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    let tick = 0;
    let raf = 0;
    let timer = 0;

    const run = () => {
      raf = window.requestAnimationFrame(run);
      tick += 1;
      if (tick % speed !== 0) return;

      frame += 1;
      const settled = Math.floor(frame / 2);

      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < settled || char === " ") return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );

      if (settled >= text.length) window.cancelAnimationFrame(raf);
    };

    timer = window.setTimeout(() => {
      raf = window.requestAnimationFrame(run);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(raf);
    };
  }, [inView, reduced, text, delay, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{display || " "}</span>
    </span>
  );
}

interface OdometerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * A mechanical counter: each digit is a column of 0-9 that rolls up to its
 * final position, with later columns lagging behind earlier ones.
 */
export function Odometer({ value, prefix = "", suffix = "", className }: OdometerProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reduced = useReducedMotion();
  const characters = String(value).split("");
  const rolled = inView || reduced;

  return (
    <span ref={ref} className={cn("odo", className)}>
      {prefix ? <span>{prefix}</span> : null}

      {characters.map((char, index) => {
        const digit = Number(char);
        if (Number.isNaN(digit)) return <span key={`${char}-${index}`}>{char}</span>;

        return (
          <span key={`${char}-${index}`} className="odo-col" aria-hidden="true">
            <span
              className="odo-track"
              style={{
                transform: `translateY(-${rolled ? digit * 10 : 0}%)`,
                transitionDelay: `${index * 110}ms`,
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n} className="odo-cell">
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}

      {suffix ? <span>{suffix}</span> : null}
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
    </span>
  );
}

interface MarqueeProps {
  items: string[];
  className?: string;
}

/**
 * A continuous strip of capability words. The list is rendered twice so the
 * loop has no visible seam, and it pauses when hovered.
 */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={cn("marquee-mask overflow-hidden", className)} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span
                key={`${pass}-${item}`}
                className="flex items-center whitespace-nowrap px-6 text-sm font-medium text-muted-foreground"
              >
                <span className="mr-6 h-1.5 w-1.5 rounded-full bg-accent/60" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
