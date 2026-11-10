import { Suspense } from "react";
import { drinkCharacters } from "@/app/lib/drink_characters";
import SpacetimeProvider from "@/app/lib/spacetime-provider";
import ActiveCharacterGuard from "./active-character-guard";

export function generateStaticParams() {
  return drinkCharacters.map((c) => ({ slug: c.id }));
}

export default function OrderLayout({ children }: LayoutProps<"/order/[slug]">) {
  return (
    <main className="mx-auto flex w-[295px] max-w-[calc(100%-2rem)] flex-1 flex-col items-center text-2xl">
      <Suspense>
        <SpacetimeProvider>
          <ActiveCharacterGuard>{children}</ActiveCharacterGuard>
        </SpacetimeProvider>
      </Suspense>
    </main>
  );
}
