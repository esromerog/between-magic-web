"use client";

import { useState } from "react";
import { draftHref, maxNameLength } from "../drink-options";
import OrderStep from "../order-step";
import { CharacterPreview } from "../preview-image";
import { useDraft } from "../use-draft";

export default function NameYourOrderForm() {
  const { draft, updateDraft } = useDraft();
  const [name, setName] = useState(draft.name ?? "");

  return (
    <OrderStep
      title="name your order"
      image={<CharacterPreview drinkBase={draft.drinkBase} flavor={draft.flavor} />}
      backHref={draftHref("/order/temperature-size", draft)}
      nextHref={draftHref("/order/confirm", draft)}
      nextDisabled={!name.trim()}
    >
      <input
        type="text"
        className="input w-full"
        placeholder="Name"
        aria-label="Order name"
        maxLength={maxNameLength}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          updateDraft({ name: e.target.value.trim() || undefined });
        }}
      />
    </OrderStep>
  );
}
