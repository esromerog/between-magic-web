"use client";

import { SpacetimeDBProvider } from "spacetimedb/react";
import { useMemo, type ReactNode } from "react";
import { DbConnection } from "./module_bindings";


const uri = process.env.NEXT_PUBLIC_SPACETIMEDB_URI ?? "ws://127.0.0.1:3000";
const databaseName =
  process.env.NEXT_PUBLIC_SPACETIMEDB_DATABASE ?? "between-magic-db";

const tokenKey = `between-magic-auth-token:${uri}/${databaseName}`;

function readToken() {
  try {
    return localStorage.getItem(tokenKey) ?? undefined;
  } catch {
    return undefined;
  }
}

export default function SpacetimeProvider({
  children,
}: {
  children: ReactNode;
}) {

  const connectionBuilder = useMemo(
    () =>
      DbConnection.builder()
        .withUri(uri)
        .withDatabaseName(databaseName)
        .withToken(typeof window === "undefined" ? undefined : readToken())
        .withLightMode(true)
        .onConnect((_conn, _identity, token) => {
          try {
            localStorage.setItem(tokenKey, token);
          } catch {}
        }),
    [],
  );

  return (
    <SpacetimeDBProvider connectionBuilder={connectionBuilder}>
      {children}
    </SpacetimeDBProvider>
  );
}
