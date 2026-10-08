"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { characterImage, type DrinkDraft } from "./drink-options";


const outlineColor = "color-mix(in oklab, var(--color-base-content) 0%, var(--color-base-100))";
const outline = (x: number, y: number) => `drop-shadow(${x}px ${y}px 0 ${outlineColor})`;
const stickerFilter = [
  "brightness(0)",
  outline(4, 0),
  outline(-4, 0),
  outline(0, 4),
  outline(0, -4),
  "drop-shadow(0 2px 3px rgb(0 0 0 / 0.3))",
].join(" ");

function Placeholder({
  label,
  image,
  silhouette = true,
}: {
  label?: string;
  image?: StaticImageData;
  silhouette?: boolean;
}) {
  if (image) {
    return (
      <div className="relative h-full w-full shrink-0 bg-base-200">
        <Image
          src={image}
          alt={label ?? "preview"}
          fill
          loading="eager"
          sizes="(max-width: 384px) 100vw, 384px"
          className="object-contain"
          style={silhouette ? { filter: stickerFilter } : undefined}
        />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full shrink-0 items-center justify-center bg-base-200 font-display text-3xl text-rose-400">
      {label ?? "preview"}
    </div>
  );
}

const frame = "relative mx-auto aspect-square w-full max-w-sm rounded-box border-2";
const draftBorder = "border-dotted border-neutral/50";
const finalBorder = "border-solid border-primary";

export function StaticPreview({
  label,
  image,
  final = false,
  silhouette = true,
}: {
  label?: string;
  image?: StaticImageData;
  final?: boolean;
  silhouette?: boolean;
}) {
  return (
    <div
      className={`${frame} ${final ? finalBorder : draftBorder} overflow-hidden`}
    >
      <Placeholder label={label} image={image} silhouette={silhouette} />
    </div>
  );
}

export function CharacterPreview({
  drinkBase,
  flavor,
  final,
  silhouette,
}: Pick<DrinkDraft, "drinkBase" | "flavor"> & {
  final?: boolean;
  silhouette?: boolean;
}) {
  return (
    <StaticPreview
      final={final}
      silhouette={silhouette}
      image={characterImage(drinkBase, flavor)}
    />
  );
}

export function SwipePreview<T extends string>({
  items,
  value,
  onChange,
}: {
  items: { tag: T; label: string; image?: StaticImageData }[];
  value: T;
  onChange: (tag: T) => void;
}) {
  const index = Math.max(0, items.findIndex((i) => i.tag === value));
  const ref = useRef<HTMLDivElement>(null);
  // Index we are scrolling to programmatically; scroll events are ignored until we arrive.
  const target = useRef<number | null>(null);
  const mounted = useRef(false);

  const currentIndex = (el: HTMLDivElement) => Math.round(el.scrollLeft / el.clientWidth);

  useEffect(() => {
    const el = ref.current;
    if (!el || currentIndex(el) === index) return;
    target.current = index;
    el.scrollTo({
      left: index * el.clientWidth,
      behavior: mounted.current ? "smooth" : "instant",
    });
    // Safety net in case the scroll is interrupted before reaching the target.
    setTimeout(() => (target.current = null), 600);
  }, [index]);

  useEffect(() => {
    mounted.current = true;
  }, []);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const i = currentIndex(e.currentTarget);
    if (target.current !== null) {
      if (i === target.current) target.current = null;
      return;
    }
    if (i !== index && items[i]) onChange(items[i].tag);
  };

  return (
    <div ref={ref} className={`carousel ${frame} ${draftBorder}`} onScroll={onScroll}>
      {items.map(({ tag, label, image }) => (
        <div key={tag} className="carousel-item h-full w-full">
          <Placeholder label={label} image={image} />
        </div>
      ))}
    </div>
  );
}
