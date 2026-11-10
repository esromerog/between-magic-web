import { notFound, redirect } from "next/navigation";
import { getDrinkCharacter } from "@/app/lib/drink_characters";
import SpawnForm from "./spawn-form";

export default async function SelectBiome({
  params,
  searchParams,
}: PageProps<"/order/[slug]/select-biome">) {
  const { slug } = await params;
  const { name } = await searchParams;
  const drink = getDrinkCharacter(slug)?.drink;
  if (!drink) notFound();
  if (typeof name !== "string" || !name.trim()) redirect(`/order/${slug}`);

  return <SpawnForm slug={slug} drink={drink} name={name} />;
}
