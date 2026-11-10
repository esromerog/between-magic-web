"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { useReducer, useSpacetimeDB, useTable } from "spacetimedb/react";
import { reducers, tables } from "@/app/lib/module_bindings";
import type { Drink } from "@/app/lib/module_bindings/types";
import { biomes, getBiome } from "@/app/lib/biomes";
import Highlight from "@/app/components/highlight";
import StarButton from "@/app/components/star-button";

export default function SpawnForm({
  slug,
  drink,
  name,
}: {
  slug: string;
  drink: Drink;
  name: string;
}) {
  const [biomeId, setBiomeId] = useState<string>();
  const biome = getBiome(biomeId);

  const createCharacter = useReducer(reducers.createCharacter);
  const spawnCharacter = useReducer(reducers.spawnCharacter);

  const { identity } = useSpacetimeDB();
  const [players] = useTable(tables.player);
  const [characters] = useTable(tables.character);
  const [status, setStatus] = useState<
    "idle" | "creating" | "spawning" | "done" | "failed"
  >("idle");
  const [characterId, setCharacterId] = useState<number>();

  const me = players.find((p) => identity?.isEqual(p.identity));

  function spawn(id: number) {
    if (!biome) return;
    setStatus("spawning");
    spawnCharacter({ characterId: id, location: biome.biome })
      .then(() => setStatus("done"))
      .catch(() => setStatus("failed"));
  }

  // createCharacter returns no id, so find the new row once it syncs in.
  useEffect(() => {
    if (status !== "creating" || !me) return;
    const created = characters
      .filter((c) => c.ownerId === me.playerId && c.name === name)
      .sort((a, b) => b.characterId - a.characterId)[0];
    if (!created) return;

    setCharacterId(created.characterId);
    spawn(created.characterId);
  }, [status, me, name, characters]);

  return (
    <div className="flex w-full flex-1 flex-col items-center pb-[66px]">
      <hgroup className="mt-[116px] text-center">
        <h1 className="font-display text-xl">select your environment</h1>
        <p>this will determine your alliance</p>
      </hgroup>

      <fieldset className="mt-6 flex w-full flex-col gap-4">
        {Object.entries(biomes).map(([id, b]) => (
          // Selected ("locked in"): filled with the highlight color, no shadow.
          <label
            key={id}
            style={{ "--biome": b.color, "--biome-highlight": b.highlight } as CSSProperties}
            className="flex cursor-pointer flex-col items-start rounded-box border-3 border-base-content bg-base-200 px-4 py-2 shadow-[4px_4px_0_var(--biome)] has-checked:bg-(--biome-highlight) has-checked:shadow-none has-focus-visible:outline-2 has-focus-visible:outline-offset-2"
          >
            <input
              type="radio"
              name="biome"
              className="sr-only"
              checked={biomeId === id}
              onChange={() => setBiomeId(id)}
            />
            <Highlight color={b.highlight}>{b.displayName}</Highlight>
            <span>{b.description}</span>
          </label>
        ))}
      </fieldset>

      <div className="mt-auto flex w-full gap-4 pt-10">
        <Link
          href={`/order/${slug}?${new URLSearchParams({ name })}`}
          className="btn h-auto border-base-content px-4 py-2 text-2xl font-normal shadow-[4px_4px_0_rgb(0_0_0/0.8)]"
        >
          Back
        </Link>
        <StarButton
          className="flex-1 justify-start"
          disabled={
            !me ||
            !biome ||
            status === "creating" ||
            status === "spawning" ||
            status === "done"
          }
          onClick={() => {
            if (characterId !== undefined) return spawn(characterId);
            setStatus("creating");
            createCharacter({ drink, name }).catch(() => setStatus("failed"));
          }}
        >
          Venture in
        </StarButton>
      </div>

      <p role="alert" className="mt-[19px] min-h-[60px] text-center text-error">
        {status === "failed" && "something went wrong! please try again later"}
      </p>
    </div>
  );
}
