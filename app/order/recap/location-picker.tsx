"use client";

import { useState } from "react";
import { useSpacetimeDB, useTable } from "spacetimedb/react";
import { tables, type DbConnection } from "../../lib/module_bindings";
import { locationLabels, locations, type LocationKey } from "./locations";
import { OverlayScanner } from "./scanner";

const label = "choose a location for your character";

// `initial` is where the character was already spawned (from the QR link).
export function LocationPicker({ initial }: { initial?: LocationKey }) {
  const { identity } = useSpacetimeDB();
  if (!identity) return <ScanButton initial={initial} />;
  return <PlayerScanButton identity={identity} initial={initial} />;
}

type Identity = NonNullable<ReturnType<typeof useSpacetimeDB>["identity"]>;

function PlayerScanButton({
  identity,
  initial,
}: {
  identity: Identity;
  initial?: LocationKey;
}) {
  const [players] = useTable(tables.player.where((p) => p.identity.eq(identity)));
  const playerId = players[0]?.playerId;
  if (playerId === undefined) return <ScanButton initial={initial} />;
  return <CharacterScanButton playerId={playerId} initial={initial} />;
}

function CharacterScanButton({
  playerId,
  initial,
}: {
  playerId: number;
  initial?: LocationKey;
}) {
  const [characters] = useTable(
    tables.character.where((c) => c.playerId.eq(playerId)),
  );
  const characterId = characters.reduce<number | undefined>(
    (latest, c) =>
      latest === undefined || c.characterId > latest ? c.characterId : latest,
    undefined,
  );
  return <ScanButton characterId={characterId} initial={initial} />;
}

// QR codes are links like https://…/?location=location-1; bare codes still work.
function codeFromScan(value: string) {
  try {
    return new URL(value).searchParams.get("location") ?? value;
  } catch {
    return value;
  }
}

function ScanButton({
  characterId,
  initial,
}: {
  characterId?: number;
  initial?: LocationKey;
}) {
  const { getConnection, isActive } = useSpacetimeDB();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<LocationKey | null>(initial ?? null);
  const [spawned, setSpawned] = useState<LocationKey | null>(initial ?? null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const close = () => {
    setOpen(false);
    setMessage(null);
  };

  const select = (found: LocationKey) => {
    setSelected(found);
    setError(null);
    close();
  };

  const handleScan = (value: string) => {
    const code = codeFromScan(value);
    const found = Object.hasOwn(locations, code) ? locations[code] : null;
    if (!found) {
      setMessage("something went wrong! that code wasn't valid");
      return;
    }
    select(found);
  };

  const spawn = async () => {
    if (pending || !selected) return;
    setPending(true);
    setError(null);
    try {
      const conn = getConnection() as DbConnection | null;
      if (!conn || !isActive || characterId === undefined) {
        throw new Error("Not connected or character not found");
      }
      await conn.reducers.changeLocation({
        characterId,
        location: { tag: selected },
      });
      setSpawned(selected);
    } catch (error) {
      console.error("change_location failed", error);
      setError("couldn't save your location");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-dash w-full rounded-full"
        disabled={characterId === undefined}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      {selected && (
        <button
          type="button"
          className="btn btn-primary w-full rounded-full"
          disabled={pending || spawned === selected}
          onClick={() => void spawn()}
        >
          {spawned === selected ? "currently at" : "go to"}{" "}
          {locationLabels[selected]}
        </button>
      )}
      {error && <p className="text-error text-center">{error}</p>}
      <div className={`modal ${open ? "modal-open" : ""}`} role="dialog">
        <div className="modal-box">
          {open && <OverlayScanner onScan={handleScan} />}
          <p className="text-center mt-3">
            {message ?? "scan the code where you want to spawn!"}
          </p>
          {/* Dev shortcut until QR codes are printed: pick without scanning. */}
          {process.env.NODE_ENV === "development" && (
            <div className="join w-full mt-3">
              {(Object.keys(locationLabels) as LocationKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className="btn join-item flex-1"
                  onClick={() => select(key)}
                >
                  {locationLabels[key]}
                </button>
              ))}
            </div>
          )}
          <div className="modal-action">
            <button type="button" className="btn rounded-full" onClick={close}>
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
