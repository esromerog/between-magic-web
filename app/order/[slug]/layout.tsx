import { Suspense } from "react";
import { drinkCharacters } from "@/app/lib/drink_characters";
import SpacetimeProvider from "@/app/lib/spacetime-provider";

export function generateStaticParams() {
  return drinkCharacters.map((c) => ({ slug: c.id }));
}

export default function OrderLayout({ children }: LayoutProps<"/order/[slug]">) {
  return (
    <Suspense>
      <SpacetimeProvider>{children}</SpacetimeProvider>
    </Suspense>
  );
}
