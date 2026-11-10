import Image from "next/image";
import type { ComponentProps } from "react";
import star from "@/app/assets/star.png";

// "Go forth" / "Venture in": daisyUI btn with the star icon and pink shadow.
// Looks disabled (`inactive:`) when disabled or when its form isn't valid yet.
export default function StarButton({
  className = "",
  children,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={`btn h-auto gap-2.5 border-base-content px-4 py-2 text-2xl font-normal shadow-[4px_4px_0_var(--color-primary)] inactive:pointer-events-none inactive:border-base-content/70 inactive:bg-base-200/60 inactive:text-base-content/70 inactive:shadow-none ${className}`}
    >
      <Image src={star} alt="" className="h-5 w-[27px] inactive:opacity-70" />
      {children}
    </button>
  );
}
