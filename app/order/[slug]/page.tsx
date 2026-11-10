import { notFound } from "next/navigation";
import Form from "next/form";
import { getDrinkCharacter } from "@/app/lib/drink_characters";

export default async function OrderReveal({
  params,
}: PageProps<"/order/[slug]">) {
  const { slug } = await params;
  if (!getDrinkCharacter(slug)) notFound();

  return (
    <Form action={`/order/${slug}/select-biome`}>
      <input name="name" required />
      <button type="submit" />
    </Form>
  );
}
