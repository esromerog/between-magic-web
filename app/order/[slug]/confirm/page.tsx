"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { findDrinkCharacter, getDrinkCharacter } from "@/app/lib/drink_characters";
import { getBiomeByTag } from "@/app/lib/biomes";
import CharacterCard from "@/app/components/character-card";
import Highlight from "@/app/components/highlight";
import logo from "@/app/assets/logo_svg.svg";
import { useActiveCharacter } from "../use-active-character";

export default function Confirm() {
  const { slug } = useParams<{ slug: string }>();
  const { character, spawnLocation } = useActiveCharacter();
  if (!character || !spawnLocation) return null;

  // Use the spawned character's own drink, in case they scanned a different QR.
  const drinkCharacter =
    findDrinkCharacter(character.drink) ?? getDrinkCharacter(slug);
  const biome = getBiomeByTag(spawnLocation.tag);
  const { name } = character;
  const job = drinkCharacter?.job;

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <header className="flex flex-col items-center pt-[53px]">
        <Image src={logo} alt="bommo" preload className="h-auto w-[162px]" />
        <p>your order summary</p>
      </header>

      {drinkCharacter && (
        <CharacterCard
          art={drinkCharacter.art}
          className="mt-[115px] min-w-[249px] px-[24px] pb-[82px]"
        >
          {/* Name tag across the top of the card: name, then job */}
          <div className="absolute top-[7px] left-[calc(50%-14px)] flex min-h-[83px] w-[252px] -translate-1/2 -rotate-[4.56deg] flex-col items-center justify-center rounded-[4px] border-3 border-base-content bg-base-200 px-4 text-center text-[28px] wrap-break-wordshadow-[3px_3px_0_var(--color-base-content)]">
            <p>{name}</p>
            {job?.name && (
              <p>
                <Highlight color="var(--color-job-highlight)">The {job.name}</Highlight>
              </p>
            )}
          </div>
        </CharacterCard>
      )}

      <div className="mt-[50px] w-[286px] max-w-full text-center">
        <h1 className="font-display text-xl">
          <Highlight color="var(--color-name-highlight)">{name}</Highlight> has
          landed!
        </h1>
        <p>
          look at the screen to see {name} in action joining the{" "}
          {biome && <Highlight color={biome.highlight}>{biome.displayName}</Highlight>}
        </p>
      </div>
    </div>
  );
}
