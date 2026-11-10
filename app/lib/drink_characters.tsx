import type { StaticImageData } from "next/image";
import type { Drink } from "./module_bindings/types";
import hojichaArt from "@/app/assets/character_art/Hujicha 1.png";
import matchaArt from "@/app/assets/character_art/Matcha 1.png";
import bobaArt from "@/app/assets/character_art/Boba 1.png";
import strawberryArt from "@/app/assets/character_art/Stawberry 1.png";
import blueberryArt from "@/app/assets/character_art/Blueberry 1.png";

export type DrinkCharacter = {
  id: string;
  displayName: string; // shown on the ribbon on the name page
  art: StaticImageData;
  // Same jobs as in Unity. `name` is highlighted ("Explorer"),
  // `description` goes under it ("will find new lands").
  job: { name: string; description: string };
  drink: Drink;
};


// In the future the drink properties might be encoded in the QR code
// For now, we're just encoding the qr code IDs
export const drinkCharacters: DrinkCharacter[] = [
  {
    id: "hojicha",
    displayName: "",
    art: hojichaArt,
    job: { name: "Farmer", description: "grow vegetables" },
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
    displayName: "matcha latte",
    art: matchaArt,
    job: { name: "Builder", description: "create affordable housing" },
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
    displayName: "boba milk tea",
    art: bobaArt,
    job: { name: "Explorer", description: "find new lands" },
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
    displayName: "strawberry shake",
    art: strawberryArt,
    job: { name: "Conqueror", description: "convert other lands" },
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
    displayName: "blueberry latte",
    art: blueberryArt,
    job: { name: "Gatherer", description: "get resources" },
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

// The character whose drink matches a character row from the database.
export function findDrinkCharacter(drink: Drink) {
  return drinkCharacters.find(
    (c) =>
      c.drink.drinkBase.tag === drink.drinkBase.tag &&
      c.drink.milk.tag === drink.milk.tag &&
      c.drink.flavor.tag === drink.flavor.tag &&
      c.drink.temperature.tag === drink.temperature.tag &&
      c.drink.size.tag === drink.size.tag,
  );
}
