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
  { id: "park", name: "Park" },
  { id: "amusement-park", name: "Amusement Park", parentId: "park" },
  { id: "walkway", name: "Walkway", parentId: "park" },
  { id: "health", name: "Health" },
  { id: "hospital", name: "Hospital", parentId: "health" },
  { id: "pharmacy", name: "Pharmacy", parentId: "health" },
  { id: "food", name: "Food" },
  { id: "restaurant", name: "Restaurant", parentId: "food" },
  { id: "fast-food", name: "Fast Food", parentId: "food" },
  { id: "beverage", name: "Beverage", parentId: "food" },
  { id: "fitness", name: "Fitness" },
  { id: "shopping-mall", name: "Shopping Mall" },
  { id: "hotel", name: "Hotel" },
  { id: "scenery", name: "Scenery" },
  { id: "other", name: "Other" },
  { id: "bank", name: "Bank", parentId: "other" },
  { id: "atm", name: "ATM", parentId: "other" },
  { id: "police", name: "Police", parentId: "other" },
  {
    id: "apartment-rental",
    name: "Apartment Rental",
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

export function getCategoryMarkerIcon(categoryId: string) {
  const category = categories.find(({ id }) => id === categoryId);
  if (!category) throw new Error(`Category "${categoryId}" does not exist`);
  return `/assets/markers/${category.markerIcon ?? category.id}.png`;
}
