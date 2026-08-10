import React, { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-motion";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum rotation in degrees at the corners of the card. */
  intensity?: number;
  /** Draw a soft light that follows the pointer across the surface. */
  spotlight?: boolean;
}

/**
 * Tips a card towards the pointer and tracks a spotlight across it. The tilt
 * and light are both published as CSS custom properties so the styling stays
 * in the stylesheet and React never re-renders on mouse move.
 */
export function TiltCard({
  intensity = 7,
  spotlight = true,
  className,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event);
      if (reduced) return;

      const node = ref.current;
      if (!node) return;

      const { clientX, clientY } = event;
      if (frame.current) return;

      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0;
        const rect = node.getBoundingClientRect();
        const px = (clientX - rect.left) / rect.width;
        const py = (clientY - rect.top) / rect.height;

        node.style.setProperty("--ry", `${(px - 0.5) * intensity * 2}deg`);
        node.style.setProperty("--rx", `${(0.5 - py) * intensity * 2}deg`);
        node.style.setProperty("--mx", `${px * 100}%`);
        node.style.setProperty("--my", `${py * 100}%`);
      });
    },
    [intensity, reduced, onMouseMove],
  );

  const handleLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event);
      const node = ref.current;
      if (!node) return;
      node.style.setProperty("--rx", "0deg");
      node.style.setProperty("--ry", "0deg");
    },
    [onMouseLeave],
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("tilt", spotlight && "spotlight", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  /** How far the element is pulled towards the pointer, in pixels. */
  strength?: number;
}

/**
 * Draws its child a short distance towards the pointer while hovered, then
 * springs it back. Wrap a button to give it a sense of weight.
 */
export function Magnetic({ strength = 9, className, children, ...rest }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    const node = ref.current;
    if (node) node.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn("inline-block transition-transform duration-500 ease-out", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
