import Link from "next/link";

const TUTORIAL_TEXT = "Customize your drink as you preview your character."
export default function Begin() {
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
        <Link href="/order/base" className="btn rounded-full btn-primary">
          continue
        </Link>
      </div>
    </div>
  );
}
