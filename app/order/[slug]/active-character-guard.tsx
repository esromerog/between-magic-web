"use client";

import { useEffect, type ReactNode } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import LoadingScreen from "@/app/components/loading-screen";
import { useActiveCharacter } from "./use-active-character";

// Sends players who already have a spawned character to /confirm, and anyone
// without one away from /confirm. Shows the loading screen until the tables
// have synced and any redirect has happened.
export default function ActiveCharacterGuard({
  children,
}: {
  children: ReactNode;
}) {
  const { slug } = useParams<{ slug: string }>();
  const pathname = usePathname();
  const router = useRouter();

  const { ready, me, character } = useActiveCharacter();
  const hasSpawned = character !== undefined;

  const confirmPath = `/order/${slug}/confirm`;
  const onConfirm = pathname === confirmPath;

  useEffect(() => {
    // `me` is missing while the connection is re-establishing, so wait for it.
    if (!ready || !me) return;
    if (hasSpawned && !onConfirm) router.replace(confirmPath);
    if (!hasSpawned && onConfirm) router.replace(`/order/${slug}`);
  }, [ready, me, hasSpawned, onConfirm, confirmPath, slug, router]);

  const redirecting = hasSpawned !== onConfirm;
  if (!ready || !me || redirecting) return <LoadingScreen />;
  return children;
}
