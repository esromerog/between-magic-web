import type { ReactNode } from "react";

// Tail shape from Figma (Rectangle 9 / 10), drawn inline so its fill can use
// the --color-ribbon-tail token. The mask keeps the 3px outline inside the shape.
const TAIL =
  "M0.207731 5.26312C-0.654173 2.67334 1.27362 0 4.00306 0H47.4561C49.6652 0 51.4561 1.79086 51.4561 4V45C51.4561 47.2091 49.6652 49 47.4561 49H4.00306C1.27362 49 -0.654173 46.3267 0.207732 43.7369L6.18958 25.7631C6.46247 24.9431 6.46247 24.0568 6.18958 23.2369L0.207731 5.26312Z";

function Tail({ id, className }: { id: string; className: string }) {
  return (
    <svg
      aria-hidden
      width="51.4561"
      height="49"
      viewBox="0 0 51.4561 49"
      className={`absolute -translate-1/2 ${className}`}
    >
      <mask id={id}>
        <path d={TAIL} fill="white" />
      </mask>
      <path d={TAIL} className="fill-ribbon-tail" />
      <path
        d={TAIL}
        fill="none"
        strokeWidth={6}
        mask={`url(#${id})`}
        className="stroke-base-content"
      />
    </svg>
  );
}

// The tilted pink banner with two tails. Place inside a `relative` box: it
// centers itself 10px left of the box's middle and 10px below its top edge.
export default function Ribbon({ children }: { children: ReactNode }) {
  return (
    <div className="absolute top-[10px] left-[calc(50%-10px)]">
      <Tail id="ribbon-tail-left" className="top-[29px] left-[-138px] -rotate-[4.9deg]" />
      <Tail id="ribbon-tail-right" className="top-[5px] left-[141px] -scale-y-100 rotate-[175.1deg]" />
      <p className="absolute flex h-[49px] w-[271px] -translate-1/2 -rotate-[4.9deg] items-center justify-center rounded-[4px] border-3 border-base-content bg-ribbon font-display text-[22px] whitespace-nowrap text-ribbon-content">
        {children}
      </p>
    </div>
  );
}
