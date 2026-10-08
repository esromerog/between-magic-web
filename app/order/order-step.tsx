import Link from "next/link";
import type { ReactNode } from "react";


export default function OrderStep({
  title,
  image,
  backHref,
  nextHref,
  nextLabel = "continue",
  nextVariant = "btn-primary",
  nextDisabled = false,
  onNext,
  children,
}: {
  title: string;
  image: ReactNode;
  backHref: string;
  nextHref?: string;
  nextLabel?: string;
  nextVariant?: "btn-primary" | "btn-secondary";
  nextDisabled?: boolean;
  onNext?: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 items-center px-4 pt-4 pb-4 text-center">
      <h1 className="font-display text-3xl text-rose-400 mb-3 text-start w-full">{title}</h1>
      <div className="w-full mb-4">{image}</div>
      <div className="flex flex-col flex-1 w-full items-stretch text-left">{children}</div>
      <div className="flex gap-2 mt-4">
        <Link href={backHref} className="btn rounded-full">
          back
        </Link>
        {nextDisabled || onNext || !nextHref ? (
          <button
            type="button"
            className={`btn rounded-full ${nextVariant}`}
            disabled={nextDisabled}
            onClick={onNext}
          >
            {nextLabel}
          </button>
        ) : (
          <Link href={nextHref} className={`btn rounded-full ${nextVariant}`}>
            {nextLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
