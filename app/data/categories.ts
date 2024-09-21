import {
  type Icon,
  IconBarbell,
  IconBed,
  IconBuilding,
  IconBuildingBank,
  IconBuildingCarousel,
  IconBuildingHospital,
  IconBuildingPavilion,
  IconChefHat,
  IconCurrencyYuan,
  IconGlassFull,
  IconHomeSearch,
  IconIceCream,
  IconMedicalCross,
  type IconProps,
  IconShield,
  IconShoppingBag,
  IconToolsKitchen2,
  IconTrees,
  IconVaccineBottle,
  IconWalk,
} from "@tabler/icons-react";
import { type ForwardRefExoticComponent, type RefAttributes } from "react";

import { type Category } from "./schema";

const categories: Category[] = [
  { id: "park", name: "Park", colors: { light: "#5CE54B", dark: "#22AB30" } },
  {
    id: "amusement-park",
    name: "Amusement Park",
    colors: { light: "#E29FEE", dark: "#9C51C9" },
    parentId: "park",
  },
  {
    id: "walkway",
    name: "Walkway",
    colors: { light: "#8192E4", dark: "#657DDE" },
    parentId: "park",
  },
  {
    id: "health",
    name: "Health",
    colors: { light: "#FF8098", dark: "#FB4467" }, // or #FF315F
  },
  {
    id: "hospital",
    name: "Hospital",
    colors: { light: "#FF8098", dark: "#FB4467" }, // or #FF315F
    parentId: "health",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    colors: { light: "#FF8098", dark: "#FB4467" }, // or #FF315F
    parentId: "health",
  },
  {
    id: "food",
    name: "Food",
    colors: { light: "#FFB47C", dark: "#E8662A" }, // From `restaurant` and `fast-food`
  },
  {
    id: "restaurant",
    name: "Restaurant",
    colors: { light: "#FFB47C", dark: "#E8662A" },
    parentId: "food",
  },
  {
    id: "fast-food",
    name: "Fast Food",
    colors: { light: "#FFB47C", dark: "#E8662A" },
    parentId: "food",
  },
  {
    id: "beverage",
    name: "Beverage",
    colors: { light: "#E29FEE", dark: "#9C51C9" },
    parentId: "food",
  },
  {
    id: "fitness",
    name: "Fitness",
    colors: { light: "#8CD7F9", dark: "#2295E3" },
  },
  {
    id: "shopping-mall",
    name: "Shopping Mall",
    colors: { light: "#E29FEE", dark: "#9C51C9" },
  },
  { id: "hotel", name: "Hotel", colors: { light: "#EE99F3", dark: "#A846D0" } },
  {
    id: "scenery",
    name: "Scenery",
    colors: { light: "#FCA898", dark: "#C75745" },
  },
  { id: "other", name: "Other", colors: { light: "#B6C4D0", dark: "#7F92A1" } },
  {
    id: "bank",
    name: "Bank",
    colors: { light: "#B3C4D1", dark: "#7B92A3" },
    parentId: "other",
  },
  {
    id: "atm",
    name: "ATM",
    colors: { light: "#B3C4D1", dark: "#7B92A3" },
    parentId: "other",
  },
  {
    id: "police",
    name: "Police",
    colors: { light: "#B3C4D1", dark: "#7B92A3" },
    parentId: "other",
  },
  {
    id: "apartment-rental",
    name: "Apartment Rental",
    colors: { light: "#B6C4D0", dark: "#7F92A1" },
    markerIcon: "other",
    parentId: "other",
  },
];

export default categories;

export const categoryIcons: Record<
  string,
  ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
> = {
  park: IconTrees,
  "amusement-park": IconBuildingCarousel,
  walkway: IconWalk,
  health: IconMedicalCross,
  hospital: IconBuildingHospital,
  pharmacy: IconVaccineBottle,
  food: IconToolsKitchen2,
  restaurant: IconChefHat,
  "fast-food": IconIceCream,
  beverage: IconGlassFull,
  fitness: IconBarbell,
  "shopping-mall": IconShoppingBag,
  hotel: IconBed,
  scenery: IconBuildingPavilion,
  other: IconBuilding,
  bank: IconBuildingBank,
  atm: IconCurrencyYuan,
  police: IconShield,
  "apartment-rental": IconHomeSearch,
};

export function getCategoryMarkerIcon(categoryId: string, quality: number = 2) {
  const category = categories.find(({ id }) => id === categoryId);
  if (!category) throw new Error(`Category "${categoryId}" does not exist`);
  return `/assets/${quality === 1 ? "markers" : `markers-${quality}x`}/${category.markerIcon ?? category.id}.png`;
}
