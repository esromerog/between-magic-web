"use client";

import { bases, draftHref } from "../drink-options";
import OrderStep from "../order-step";
import { SwipePreview } from "../preview-image";
import { useDraft } from "../use-draft";

export default function BaseForm() {
  const { draft, updateDraft } = useDraft();
  // The first base is shown by default, so it counts as chosen even before a swipe.
  const drinkBase = draft.drinkBase ?? bases[0].tag;

  return (
    <OrderStep
      title="base"
      image={
        <SwipePreview
          items={bases}
          value={drinkBase}
          onChange={(tag) => updateDraft({ drinkBase: tag })}
        />
      }
      backHref={draftHref("/order/begin", draft)}
      nextHref={draftHref("/order/flavor", { ...draft, drinkBase })}
    >
      <div className="join w-full">
        {bases.map(({ tag, label }) => (
          <button
            key={tag}
            type="button"
            className={`btn join-item btn-soft flex-1 ${drinkBase === tag ? "btn-active btn-primary" : ""}`}
            onClick={() => updateDraft({ drinkBase: tag })}
          >
            {label}
          </button>
        ))}
      </div>
    </OrderStep>
  );
}
