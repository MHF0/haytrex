import { useEffect, useRef, useState } from "react";

/**
 * True when the visitor has asked their OS to reduce motion. Components use
 * this to render their finished state instead of animating into it.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

interface InViewOptions {
  /** Fraction of the element that must be visible before it counts. */
  threshold?: number;
  /** Margin around the root, e.g. "0px 0px -12% 0px" to trigger slightly early. */
  rootMargin?: string;
  /** Keep the visible state after the element scrolls back out. */
  once?: boolean;
}

/**
 * Reports whether an element has scrolled into view. Falls back to "visible"
 * when IntersectionObserver is unavailable so content is never stranded hidden.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: InViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

/**
 * Vertical parallax offset in pixels, recalculated on scroll while the element
 * is near the viewport. A positive speed moves the element against the scroll.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.12) {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOffset(0);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < -200 || rect.top > viewport + 200) return;

      // Distance of the element's centre from the viewport centre.
      const distance = rect.top + rect.height / 2 - viewport / 2;
      setOffset(-distance * speed);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, reduced]);

  return { ref, offset };
}
