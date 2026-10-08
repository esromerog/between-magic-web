import Link from "next/link";
import { Suspense } from "react";
import {
  bases,
  flavors,
  parseDraft,
  sizes,
  temperatures,
} from "../drink-options";
import { CharacterPreview } from "../preview-image";
import { LocationPicker } from "./location-picker";
import { locations } from "./locations";

async function RecapContent({
  searchParams,
}: Pick<PageProps<"/order/recap">, "searchParams">) {
  const params = await searchParams;
  const { drinkBase, flavor, temperature, size, name, location } = parseDraft({
    get: (key) => {
      const v = params[key];
      return Array.isArray(v) ? v[0] : v;
    },
  });

  const properties = [
    bases.find((o) => o.tag === drinkBase)?.label,
    flavors.find((o) => o.tag === flavor)?.label,
    temperatures.find((o) => o.tag === temperature)?.label,
    sizes.find((o) => o.tag === size)?.label,
  ].filter(Boolean);

  return (
    <div className="flex flex-col flex-1 items-center px-4 pt-4 pb-4 text-center">
      <h1 className="font-display text-3xl text-rose-400 mb-3 text-start w-full">
        order confirmed!
      </h1>
      <div className="w-full mb-4">
        <CharacterPreview
          drinkBase={drinkBase}
          flavor={flavor}
          silhouette={false}
          final
        />
      </div>
      {name && <p className="font-sans text-xl">{name}</p>}
      <p>{properties.join(", ")}</p>
      <div className="flex flex-col w-full gap-2 mt-4">
        <LocationPicker initial={location ? locations[location] : undefined} />
        <Link href="/order/begin" className="btn rounded-full">
          start a new character from scratch
        </Link>
      </div>
    </div>
  );
}

export default function Recap({ searchParams }: PageProps<"/order/recap">) {
  return (
    <Suspense>
      <RecapContent searchParams={searchParams} />
    </Suspense>
  );
}
