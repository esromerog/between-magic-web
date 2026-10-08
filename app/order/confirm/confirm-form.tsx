"use client";

import { useRouter } from "next/navigation";
import { useSpacetimeDB } from "spacetimedb/react";
import { useState } from "react";
import type { DbConnection } from "../../lib/module_bindings";
import {
  bases,
  draftHref,
  flavors,
  sizes,
  temperatures,
} from "../drink-options";
import OrderStep from "../order-step";
import { CharacterPreview } from "../preview-image";
import { useDraft } from "../use-draft";

export default function ConfirmForm() {
  const router = useRouter();
  const { draft } = useDraft();
  const { getConnection, isActive } = useSpacetimeDB();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  const { drinkBase, flavor, temperature, size, name } = draft;
  const complete = !!(drinkBase && flavor && temperature && size && name);

  const options = [
    bases.find((o) => o.tag === drinkBase)?.label,
    flavors.find((o) => o.tag === flavor)?.label,
    temperatures.find((o) => o.tag === temperature)?.label,
    sizes.find((o) => o.tag === size)?.label,
  ].filter(Boolean);

  const submit = async () => {
    if (!complete || pending) return;
    setFailed(false);
    setPending(true);
    try {
      const conn = getConnection() as DbConnection | null;

      if (!conn || !isActive) throw new Error("Not connected");
      await conn.reducers.createCharacter({
        drink: {
          drinkBase: { tag: drinkBase },
          milk: { tag: "Whole" },
          flavor: { tag: flavor },
          temperature: { tag: temperature },
          size: { tag: size },
        },
        name,
        location: { tag: "None" },
      });
      router.push(draftHref("/order/recap", draft));
    } catch (error) {
      console.error("create_character failed", error);
      setFailed(true);
      setPending(false);
    }
  };

  return (
    <>
      <OrderStep
        title="confirm"
        image={<CharacterPreview drinkBase={drinkBase} flavor={flavor} final />}
        backHref={draftHref("/order/name-your-order", draft)}
        nextLabel={pending ? "sending…" : "confirm"}
        nextVariant="btn-primary"
        nextDisabled={!complete || pending}
        onNext={submit}
      >
        {name && <p className="font-sans text-xl text-center">{name}</p>}
        <p className="text-center">{options.join(", ")}</p>
      </OrderStep>
      <div className={`modal ${failed ? "modal-open" : ""}`} role="alertdialog">
        <div className="modal-box">
          <p>Ups! There was an error, try again</p>
          <div className="modal-action">
            <button
              type="button"
              className="btn rounded-full"
              onClick={() => setFailed(false)}
            >
              close
            </button>
            <button
              type="button"
              className="btn rounded-full btn-primary"
              onClick={submit}
            >
              retry
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
