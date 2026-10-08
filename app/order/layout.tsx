import { Suspense } from "react";
import { connection } from "next/server";
import SpacetimeProvider from "../lib/spacetime-provider";

// The SpacetimeDB provider generates a random connection id while rendering,
// which can't be prerendered. Deferring to request time keeps it out of the
// static shell; the connection itself is opened client-side either way.
async function RequestTimeProvider({ children }: { children: React.ReactNode }) {
  await connection();
  return <SpacetimeProvider>{children}</SpacetimeProvider>;
}

// One provider for the whole flow keeps a single connection (and identity)
// alive from confirm through recap instead of reconnecting on every page.
export default function OrderLayout({ children }: LayoutProps<"/order">) {
  return (
    <div className="flex flex-col flex-1 w-full max-w-90 mx-auto">
      <Suspense fallback={null}>
        <RequestTimeProvider>{children}</RequestTimeProvider>
      </Suspense>
    </div>
  );
}
