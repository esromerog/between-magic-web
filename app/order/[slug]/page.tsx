import { notFound } from "next/navigation";
import Form from "next/form";
import { getDrinkCharacter } from "@/app/lib/drink_characters";
import CharacterCard from "@/app/components/character-card";
import Highlight from "@/app/components/highlight";
import Ribbon from "@/app/components/ribbon";
import StarButton from "@/app/components/star-button";

export default async function OrderReveal({
  params,
  searchParams,
}: PageProps<"/order/[slug]">) {
  const { slug } = await params;
  const { name } = await searchParams; // set when coming back from select-biome
  const character = getDrinkCharacter(slug);
  if (!character) notFound();
  const { job } = character;

  return (
    <Form
      action={`/order/${slug}/select-biome`}
      className="flex w-full flex-1 flex-col items-center pb-[120px]"
    >
      <hgroup className="mt-[113px] text-center">
        <h1 className="font-display text-xl">name your character</h1>
        <p>and jump into the world</p>
      </hgroup>

      <CharacterCard
        art={character.art}
        className="mt-[73px] min-w-[273px] px-[36px] pb-[21px]"
      >
        <Ribbon>{character.displayName}</Ribbon>
        {job.name && (
          <div className="mt-[29px] text-center">
            <Highlight color="var(--color-job-highlight)">{job.name}</Highlight>
            <p>{job.description}</p>
          </div>
        )}
      </CharacterCard>

      <input
        name="name"
        required
        pattern=".*\S.*"
        placeholder="Name"
        defaultValue={typeof name === "string" ? name : undefined}
        className="input relative z-10 -mt-[8px] h-auto w-full rounded-full border-base-content bg-base-200 px-5 py-2 text-2xl placeholder:text-base-content/60"
      />

      <StarButton type="submit" className="mt-auto self-end">
        Go forth
      </StarButton>
    </Form>
  );
}
