"use client";

import { bases, draftHref, flavorsForBase } from "../drink-options";
import OrderStep from "../order-step";
import { SwipePreview } from "../preview-image";
import { useDraft } from "../use-draft";

export default function FlavorForm() {
  const { draft, updateDraft } = useDraft();
  const drinkBase = draft.drinkBase ?? bases[0].tag;
  const options = flavorsForBase(drinkBase);
  const flavor = draft.flavor ?? options[0].tag;

  return (
    <OrderStep
      title="flavor"
      image={
        <SwipePreview
          items={options.map((o) => ({ ...o, image: o.images[drinkBase] }))}
          value={flavor}
          onChange={(tag) => updateDraft({ flavor: tag })}
        />
      }
      backHref={draftHref("/order/base", draft)}
      nextHref={draftHref("/order/temperature-size", {
        ...draft,
        drinkBase,
        flavor,
      })}
    >
      <div className="join w-full">
        {options.map(({ tag, label }) => (
          <button
            key={tag}
            type="button"
            className={`btn join-item btn-soft flex-1 ${flavor === tag ? "btn-active btn-primary" : ""}`}
            onClick={() => updateDraft({ flavor: tag })}
          >
            {label}
          </button>
        ))}
      </div>
    </OrderStep>
  );
}
