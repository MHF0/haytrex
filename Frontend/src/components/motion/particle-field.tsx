import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-motion";
import { COLORS } from "@/lib/constants";

interface ParticleFieldProps {
  /** Number of drifting nodes. Scaled down automatically on small screens. */
  count?: number;
  /** Overall opacity of the layer. Kept low so it sits behind the content. */
  opacity?: number;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * A slow constellation of connected points, drawn in the brand accent blue.
 * Purely decorative: it is hidden from assistive tech, pauses when scrolled
 * out of view, and renders nothing at all under reduced-motion settings.
 */
export function ParticleField({ count = 46, opacity = 0.5, className }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 640 ? Math.round(count * 0.45) : count;
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.8 + 0.9,
      }));
    };

    const draw = () => {
      frame = window.requestAnimationFrame(draw);
      if (!running) return;

      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around the edges so the field never thins out.
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.accent.default;
        ctx.globalAlpha = 0.5;
        ctx.fill();
      }

      // Link nearby nodes, and link harder to whatever is near the pointer.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > 132) continue;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = COLORS.accent.light;
          ctx.globalAlpha = (1 - dist / 132) * 0.28;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        const pdx = nodes[i].x - pointer.x;
        const pdy = nodes[i].y - pointer.y;
        const pdist = Math.hypot(pdx, pdy);
        if (pdist < 170) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.strokeStyle = COLORS.accent.default;
          ctx.globalAlpha = (1 - pdist / 170) * 0.4;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const clearPointer = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    draw();

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            running = entry.isIntersecting;
          })
        : null;
    observer?.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", clearPointer);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", clearPointer);
    };
  }, [count, reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    />
  );
}

/**
 * A thin accent bar across the top of the window showing how far down the page
 * the visitor has scrolled.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
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
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div
        ref={barRef}
        className="scroll-progress h-full w-full bg-gradient-to-r from-blue-600 via-accent to-indigo-600"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
