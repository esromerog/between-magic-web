import Image from "next/image";
import Link from "next/link";

const INTRO_TEXT = "Welcome, sorcerers. Order a drink and join the world";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center">
      <div className="flex flex-col items-center justify-center mb-7">
        <h1 className="font-display text-4xl text-rose-400">between magic</h1>
        <p>{INTRO_TEXT}</p>
      </div>
      <button className="btn btn-disabled rounded-full mb-2 btn-wide">log in</button>
      <Link href="/order" className="btn rounded-full btn-wide btn-primary">
        continue as guest
      </Link>
    </div>
  );
}
