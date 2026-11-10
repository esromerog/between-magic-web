"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useReducer, useSpacetimeDB, useTable } from "spacetimedb/react";
import { reducers, tables } from "@/app/lib/module_bindings";
import { getBiome } from "@/app/lib/biomes";
import { getDrinkCharacter } from "@/app/lib/drink_characters";

export default function SpawnInGame() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const query = useSearchParams();
  const name = query.get("name") ?? "";
  const biome = getBiome(query.get("biome"));
  const drink = getDrinkCharacter(slug)?.drink;

  const createCharacter = useReducer(reducers.createCharacter);
  const spawnCharacter = useReducer(reducers.spawnCharacter);

  const { identity } = useSpacetimeDB();
  const [players] = useTable(tables.player);
  const [characters] = useTable(tables.character);
  const [status, setStatus] = useState<"idle" | "creating" | "spawning" | "failed">("idle");
  const [characterId, setCharacterId] = useState<number>();

  const me = players.find((p) => identity?.isEqual(p.identity));

  function spawn(id: number) {
    if (!biome) return;
    setStatus("spawning");
    spawnCharacter({ characterId: id, location: biome.biome })
      .then(() => router.push(`/order/${slug}/confirm`))
      .catch(() => setStatus("failed"));
  }

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
    <>
      <button
        disabled={!me || !drink || !biome || !name || status === "creating" || status === "spawning"}
        onClick={() => {
          if (!drink) return;
          if (characterId !== undefined) return spawn(characterId);
          setStatus("creating");
          createCharacter({ drink, name }).catch(() => setStatus("failed"));
        }}
      />
      {status === "failed" && <div role="alert" />}
    </>
  );
}
