import type { CSSProperties, ReactNode } from "react";

// The marker stroke behind a word (biome names, the character's name).
// `color` is any CSS color, e.g. "var(--color-name-highlight)".
export default function Highlight({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) {
  return (
    <span
      style={{ "--highlight": color } as CSSProperties}
      className="relative isolate whitespace-nowrap before:absolute before:-inset-x-[0.25em] before:top-1/2 before:-z-10 before:h-5 before:-translate-y-1/2 before:rounded-full before:bg-(--highlight)"
    >
      {children}
    </span>
  );
}
