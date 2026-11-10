import type { Biome } from "./module_bindings/types";

export type BiomeId = "desert" | "ocean" | "forest" | "mountain";

type BiomeInfo = {
  biome: Biome;
  displayName: string;
  description: string;
  color: string; // card shadow — set in app/globals.css
  highlight: string; // behind the name, and the locked-in card fill
};

export const biomes: Record<BiomeId, BiomeInfo> = {
  desert: {
    biome: { tag: "Desert" },
    displayName: "Dessert",
    description: "Warm and empty, but sweet",
    color: "var(--color-desert)",
    highlight: "var(--color-desert-highlight)",
  },
  ocean: {
    biome: { tag: "Ocean" },
    displayName: "Wet Ocean",
    description: "Remember to drink water",
    color: "var(--color-ocean)",
    highlight: "var(--color-ocean-highlight)",
  },
  forest: {
    biome: { tag: "Forest" },
    displayName: "Treetop Forest",
    description: "A cabin in the woods",
    color: "var(--color-forest)",
    highlight: "var(--color-forest-highlight)",
  },
  mountain: {
    biome: { tag: "Mountain" },
    displayName: "Hard Rock Mountains",
    description: "If you like guitars",
    color: "var(--color-mountain)",
    highlight: "var(--color-mountain-highlight)",
  },
};

export function getBiome(id: string | null | undefined) {
  return id && id in biomes ? biomes[id as BiomeId] : undefined;
}

// Look a biome up by the tag stored in the database (e.g. "Desert").
export function getBiomeByTag(tag: Biome["tag"]) {
  return Object.values(biomes).find((b) => b.biome.tag === tag);
}
