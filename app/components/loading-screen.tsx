import Image from "next/image";
import logo from "@/app/assets/logo_svg.svg";

// Full-screen cover shown while SpacetimeDB connects and syncs.
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-base-100 text-2xl">
      <Image src={logo} alt="bommo" preload className="h-auto w-[162px]" />
      <hgroup className="absolute top-[calc(50%+198px)] left-1/2 w-[286px] -translate-x-1/2 text-center">
        <h1 className="font-display text-xl">loading...</h1>
        <p>please wait</p>
      </hgroup>
    </div>
  );
}
