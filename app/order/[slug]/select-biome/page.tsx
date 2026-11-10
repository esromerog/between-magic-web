import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { biomes } from "@/app/lib/biomes";
import { getDrinkCharacter } from "@/app/lib/drink_characters";

export default async function SelectBiome({
  params,
  searchParams,
}: PageProps<"/order/[slug]/select-biome">) {
  const { slug } = await params;
  const { name } = await searchParams;
  if (!getDrinkCharacter(slug)) notFound();
  if (typeof name !== "string" || !name.trim()) redirect(`/order/${slug}`);
  
  
  return (
    <div>
      {Object.entries(biomes).map(([id, { displayName }]) => (
        <Link
          key={id}
          href={`/order/${slug}/send?${new URLSearchParams({ name, biome: id })}`}
        >
          {displayName}
        </Link>
      ))}
    </div>
  );
}
