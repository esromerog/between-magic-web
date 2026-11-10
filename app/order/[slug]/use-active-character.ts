"use client";

import { useSpacetimeDB, useTable } from "spacetimedb/react";
import { tables } from "@/app/lib/module_bindings";

// The player connected on this device, and their spawned character (if any).
// `ready` is false until the tables have synced.
export function useActiveCharacter() {
  const { identity } = useSpacetimeDB();
  const [players, playersReady] = useTable(tables.player);
  const [characters, charactersReady] = useTable(tables.character);
  const [activeCharacters, activeReady] = useTable(tables.activeCharacter);

  const me = players.find((p) => identity?.isEqual(p.identity));
  const active = activeCharacters.find((a) =>
    characters.some(
      (c) => c.characterId === a.characterId && c.ownerId === me?.playerId,
    ),
  );
  const character = characters.find(
    (c) => c.characterId === active?.characterId,
  );

  return {
    ready: playersReady && charactersReady && activeReady,
    me,
    character,
    spawnLocation: active?.spawnLocation,
  };
}
