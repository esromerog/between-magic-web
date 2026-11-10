import type { Drink } from "./module_bindings/types";

export type DrinkCharacter = {
  id: string;
  drink: Drink;
};


// In the future the drink properties might be encoded in the QR code
// For now, we're just encoding the qr code IDs
export const drinkCharacters: DrinkCharacter[] = [
  {
    id: "hojicha",
    drink: {
      drinkBase: { tag: "Hojicha" },
      milk: { tag: "Whole" },
      flavor: { tag: "Plain" },
      temperature: { tag: "Hot" },
      size: { tag: "Small" },
    },
  },
  {
    id: "matcha",
    drink: {
      drinkBase: { tag: "Matcha" },
      milk: { tag: "Whole" },
      flavor: { tag: "Plain" },
      temperature: { tag: "Hot" },
      size: { tag: "Small" },
    },
  },
  {
    id: "boba",
    drink: {
      drinkBase: { tag: "Boba" },
      milk: { tag: "Whole" },
      flavor: { tag: "Plain" },
      temperature: { tag: "Hot" },
      size: { tag: "Small" },
    },
  },
  {
    id: "strawberry",
    drink: {
      drinkBase: { tag: "Coffee" },
      milk: { tag: "Whole" },
      flavor: { tag: "Strawberry" },
      temperature: { tag: "Hot" },
      size: { tag: "Small" },
    },
  },
  {
    id: "blueberry",
    drink: {
      drinkBase: { tag: "Coffee" },
      milk: { tag: "Whole" },
      flavor: { tag: "Blueberry" },
      temperature: { tag: "Hot" },
      size: { tag: "Small" },
    },
  },
];

export function getDrinkCharacter(id: string) {
  return drinkCharacters.find((c) => c.id === id);
}
