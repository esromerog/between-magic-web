"use client";

import { useSearchParams } from "next/navigation";
import { draftToQuery, parseDraft, type DrinkDraft } from "./drink-options";

export function useDraft() {
  const draft = parseDraft(useSearchParams());

  const updateDraft = (patch: DrinkDraft) => {
    // Re-parsing drops a chosen flavor that doesn't work with a newly picked base.
    const next = draftToQuery(
      parseDraft(new URLSearchParams(draftToQuery({ ...draft, ...patch }))),
    );
    // Native history API syncs with useSearchParams without a server round trip,
    // which keeps swipes instant.
    window.history.replaceState(null, "", next ? `?${next}` : window.location.pathname);
  };

  return { draft, updateDraft };
}
