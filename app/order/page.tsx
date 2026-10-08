import { redirect } from "next/navigation";
import { Suspense } from "react";
import { withDraft } from "./drink-options";

async function Redirect({ searchParams }: Pick<PageProps<"/order">, "searchParams">): Promise<never> {
  redirect(withDraft("/order/begin", await searchParams));
}

export default function Order({ searchParams }: PageProps<"/order">) {
  return (
    <Suspense>
      <Redirect searchParams={searchParams} />
    </Suspense>
  );
}
