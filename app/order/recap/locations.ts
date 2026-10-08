import type { SpawnLocation } from "../../lib/module_bindings/types";

type Spawnable = Exclude<SpawnLocation["tag"], "None">;

export type LocationKey = Spawnable;

export const locations: Record<string, Spawnable> = {
  "location-1": "Room640",
  "location-2": "MfaArea",
};

export const locationLabels: Record<Spawnable, string> = {
  Room640: "640",
  MfaArea: "MFA Area",
};
