import React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-motion";

type Direction = "up" | "down" | "left" | "right" | "zoom" | "blur" | "rotate";

const directionClass: Record<Direction, string> = {
  up: "",
  down: "reveal-down",
  left: "reveal-left",
  right: "reveal-right",
  zoom: "reveal-zoom",
  blur: "reveal-blur",
  rotate: "reveal-rotate",
};

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which way the content travels in from. */
  direction?: Direction;
  /** Milliseconds to wait before starting, for staggering siblings. */
  delay?: number;
  /** Replay the animation each time the element re-enters the viewport. */
  repeat?: boolean;
  /** Render as a different element, e.g. "span" inside a paragraph. */
  as?: "div" | "span" | "li" | "section" | "article";
}

/**
 * Fades and slides its children into place the first time they scroll into
 * view. Movement is handled entirely by the `.reveal` classes, which collapse
 * to a plain fade when the visitor prefers reduced motion.
 */
export function Reveal({
  direction = "up",
  delay = 0,
  repeat = false,
  as: Tag = "div",
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: !repeat });

  // Widen the tag so a single ref type works for whichever element was chosen.
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn("reveal", directionClass[direction], inView && "is-visible", className)}
      style={{ ["--reveal-delay" as string]: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
}

interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap in milliseconds between each child's entrance. */
  step?: number;
  /** Delay before the first child starts. */
  initialDelay?: number;
  direction?: Direction;
}

/**
 * Wraps each direct child in a <Reveal> with an increasing delay, so a grid or
 * list arrives one item at a time rather than all at once.
 */
export function Stagger({
  step = 90,
  initialDelay = 0,
  direction = "up",
  className,
  children,
  ...rest
}: StaggerProps) {
  return (
    <div className={className} {...rest}>
      {React.Children.map(children, (child, index) => (
        <Reveal direction={direction} delay={initialDelay + index * step} className="h-full">
          {child}
        </Reveal>
      ))}
    </div>
  );
}

interface SplitHeadingProps {
  /** The line of text to animate one word at a time. */
  text: string;
  /** Delay before the first word rises, in milliseconds. */
  baseDelay?: number;
  className?: string;
  /** Optional class applied to specific words, keyed by the word itself. */
  highlight?: { words: string[]; className: string };
}

/**
 * Splits a heading into words and raises them into place in sequence. Screen
 * readers get the sentence as a single label rather than a pile of fragments.
 */
export function SplitHeading({
  text,
  baseDelay = 0,
  className,
  highlight,
}: SplitHeadingProps) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => {
        const isHighlighted = highlight?.words.includes(word.replace(/[^\w]/g, ""));
        return (
          <span
            key={`${word}-${index}`}
            aria-hidden="true"
            className="word-rise"
            style={{
              ["--i" as string]: index,
              ["--base-delay" as string]: `${baseDelay}ms`,
            }}
          >
            <span className={isHighlighted ? highlight?.className : undefined}>{word}</span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </span>
  );
}
