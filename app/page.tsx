import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { withDraft } from "./order/drink-options";

const INTRO_TEXT = "Welcome, sorcerers. Order a drink and join the world";

// Scanning a location's QR code lands here as /?location=<code>; carrying it
// into the order flow lets the character spawn there.
async function GuestLink({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  return (
    <Link
      href={withDraft("/order", await searchParams)}
      className="btn rounded-full btn-wide btn-primary"
    >
      continue as guest
    </Link>
  );
}

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center">
      <div className="flex flex-col items-center justify-center mb-7">
        <h1 className="font-display text-4xl text-rose-400">between magic</h1>
        <p>{INTRO_TEXT}</p>
      </div>
      <button className="btn btn-disabled rounded-full mb-2 btn-wide">log in</button>
      <Suspense
        fallback={
          <Link href="/order" className="btn rounded-full btn-wide btn-primary">
            continue as guest
          </Link>
        }
      >
        <GuestLink searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
