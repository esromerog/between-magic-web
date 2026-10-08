"use client";

import { draftHref, sizes, temperatures } from "../drink-options";
import OrderStep from "../order-step";
import { CharacterPreview } from "../preview-image";
import { useDraft } from "../use-draft";

export default function TemperatureSizeForm() {
  const { draft, updateDraft } = useDraft();

  return (
    <OrderStep
      title="temperature & size"
      image={<CharacterPreview drinkBase={draft.drinkBase} flavor={draft.flavor} />}
      backHref={draftHref("/order/flavor", draft)}
      nextHref={draftHref("/order/name-your-order", draft)}
      nextDisabled={!draft.temperature || !draft.size}
    >
      <div className="fieldset">
        <legend className="fieldset-legend">Temperature</legend>
        <div className="join w-full">
          {temperatures.map(({ tag, label }) => (
            <button
              key={tag}
              type="button"
              className={`btn join-item btn-soft flex-1 ${draft.temperature === tag ? "btn-active btn-primary" : ""}`}
              onClick={() => updateDraft({ temperature: tag })}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="fieldset">
        <legend className="fieldset-legend">Size</legend>
        <div className="join w-full">
          {sizes.map(({ tag, label }) => (
            <button
              key={tag}
              type="button"
              className={`btn join-item btn-soft flex-1 ${draft.size === tag ? "btn-active btn-primary" : ""}`}
              onClick={() => updateDraft({ size: tag })}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </OrderStep>
  );
}
