import type { StaticImageData } from "next/image";
import type {
  DrinkBase,
  Flavor,
  Size,
  Temperature,
} from "../lib/module_bindings/types";
import { locations, type LocationKey } from "./recap/locations";
import bananaHojicha from "../assets/character_images/P_bh.png";
import bananaMatcha from "../assets/character_images/P_bm.png";
import roastedHojicha from "../assets/character_images/P_h.png";
import ujiMatcha from "../assets/character_images/P_m.png";
import roseHojicha from "../assets/character_images/P_rh.png";
import roseMatcha from "../assets/character_images/P_rm.png";
import vanillaHojicha from "../assets/character_images/P_vh.png";
import vanillaMatcha from "../assets/character_images/P_vm.png";

// Base previews show that base's signature character (Uji / Roasted).
export const bases: {
  tag: DrinkBase["tag"];
  label: string;
  image: StaticImageData;
}[] = [
  { tag: "Matcha", label: "Matcha", image: ujiMatcha },
  { tag: "Hojicha", label: "Hojicha", image: roastedHojicha },
];


export const flavors: {
  tag: Flavor["tag"];
  label: string;
  onlyFor?: DrinkBase["tag"];
  images: Partial<Record<DrinkBase["tag"], StaticImageData>>;
}[] = [
  {
    tag: "Roasted",
    label: "Roasted",
    onlyFor: "Hojicha",
    images: { Hojicha: roastedHojicha },
  },
  { tag: "Uji", label: "Uji", onlyFor: "Matcha", images: { Matcha: ujiMatcha } },
  {
    tag: "Banana",
    label: "Banana",
    images: { Matcha: bananaMatcha, Hojicha: bananaHojicha },
  },
  {
    tag: "Rose",
    label: "Rose",
    images: { Matcha: roseMatcha, Hojicha: roseHojicha },
  },
  {
    tag: "Vanilla",
    label: "Vanilla",
    images: { Matcha: vanillaMatcha, Hojicha: vanillaHojicha },
  },
];

export const temperatures: { tag: Temperature["tag"]; label: string }[] = [
  { tag: "Hot", label: "Hot" },
  { tag: "Iced", label: "Iced" },
];

export const sizes: { tag: Size["tag"]; label: string }[] = [
  { tag: "Small", label: "16 oz" },
  { tag: "Large", label: "20 oz" },
];

export function flavorsForBase(base?: DrinkBase["tag"]) {
  return flavors.filter((f) => !f.onlyFor || f.onlyFor === base);
}

export function characterImage(
  base?: DrinkBase["tag"],
  flavor?: Flavor["tag"],
): StaticImageData | undefined {
  if (!base) return undefined;
  const flavorImage = flavors.find((f) => f.tag === flavor)?.images[base];
  return flavorImage ?? bases.find((b) => b.tag === base)?.image;
}

export type DrinkDraft = {
  drinkBase?: DrinkBase["tag"];
  flavor?: Flavor["tag"];
  temperature?: Temperature["tag"];
  size?: Size["tag"];
  name?: string;
  // Code from the QR link (e.g. "location-1"); see `locations`.
  location?: string;
};

export const maxNameLength = 30;

type RawParams = { get(key: string): string | null | undefined };

function pick<T extends string>(
  options: { tag: T }[],
  value: string | null | undefined,
): T | undefined {
  return options.find((o) => o.tag === value)?.tag;
}

export function parseDraft(params: RawParams): DrinkDraft {
  const drinkBase = pick(bases, params.get("drinkBase"));
  return {
    drinkBase,
    flavor: pick(flavorsForBase(drinkBase), params.get("flavor")),
    temperature: pick(temperatures, params.get("temperature")),
    size: pick(sizes, params.get("size")),
    name: params.get("name")?.slice(0, maxNameLength) || undefined,
    location: parseLocation(params.get("location")),
  };
}

export function parseLocation(code: string | null | undefined) {
  return code && Object.hasOwn(locations, code) ? code : undefined;
}

export function locationFromCode(code: string | undefined): LocationKey | undefined {
  return code && Object.hasOwn(locations, code) ? locations[code] : undefined;
}

export function draftToQuery(draft: DrinkDraft): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(draft)) {
    if (value) params.set(key, value);
  }
  return params.toString();
}


export function withDraft(
  path: string,
  searchParams: Record<string, string | string[] | undefined>,
): string {
  const draft = parseDraft({
    get: (key) => {
      const v = searchParams[key];
      return Array.isArray(v) ? v[0] : v;
    },
  });
  const query = draftToQuery(draft);
  return query ? `${path}?${query}` : path;
}

export function draftHref(path: string, draft: DrinkDraft): string {
  const query = draftToQuery(draft);
  return query ? `${path}?${query}` : path;
}
