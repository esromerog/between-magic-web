import Link from "next/link";
import { Suspense } from "react";
import { withDraft } from "../drink-options";

const TUTORIAL_TEXT = "Customize your drink as you preview your character."

async function ContinueLink({ searchParams }: Pick<PageProps<"/order/begin">, "searchParams">) {
  return (
    <Link
      href={withDraft("/order/base", await searchParams)}
      className="btn rounded-full btn-primary"
    >
      continue
    </Link>
  );
}

export default function Begin({ searchParams }: PageProps<"/order/begin">) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4 text-center">
        <div className="flex flex-col flex-1 items-center justify-center mb-7">
        <h1 className="font-display text-3xl text-rose-400">how to order?</h1>
        <p>{TUTORIAL_TEXT}</p>
      </div>
      <div className="flex gap-2">
        <Link href="/" className="btn rounded-full btn-disabled">
          back
        </Link>
        <Suspense
          fallback={
            <Link href="/order/base" className="btn rounded-full btn-primary">
              continue
            </Link>
          }
        >
          <ContinueLink searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
