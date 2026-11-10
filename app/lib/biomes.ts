import type { Biome } from "./module_bindings/types";

export type BiomeId = "desert" | "ocean" | "forest" | "mountain";

export const biomes: Record<BiomeId, { biome: Biome; displayName: string }> = {
  desert: { biome: { tag: "Desert" }, displayName: "desert" },
  ocean: { biome: { tag: "Ocean" }, displayName: "ocean" },
  forest: { biome: { tag: "Forest" }, displayName: "forest" },
  mountain: { biome: { tag: "Mountain" }, displayName: "mountain" },
};

export function getBiome(id: string | null | undefined) {
  return id && id in biomes ? biomes[id as BiomeId] : undefined;
}
