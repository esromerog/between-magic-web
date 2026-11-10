import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

// Art is scaled to fit a 194×194 square, so the card grows a little or shrinks
// with each character's art.
const ART_MAX = 194;

// The cream card with the character art. Children render below the art
// (or on top of the card, if absolutely positioned). Pass padding and
// min-width per page via className.
export default function CharacterCard({
  art,
  className = "",
  children,
}: {
  art: StaticImageData;
  className?: string;
  children?: ReactNode;
}) {
  const scale = Math.min(ART_MAX / art.width, ART_MAX / art.height);

  return (
    <div
      className={`relative flex shrink-0 flex-col items-center border-3 border-base-content bg-base-300 pt-[66px] ${className}`}
    >
      <Image
        src={art}
        alt=""
        preload
        width={Math.round(art.width * scale)}
        height={Math.round(art.height * scale)}
      />
      {children}
    </div>
  );
}
