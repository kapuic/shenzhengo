import {
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
  IconShield,
  IconShoppingBag,
  IconToolsKitchen2,
  IconTrees,
  IconVaccineBottle,
  IconWalk,
  type TablerIconsProps,
} from "@tabler/icons-react";

import { type Category } from "./schema";

const categories: Category[] = [
  {
    id: "park",
    name: "Park",
    markerUrl: "/assets/markers/park.png",
  },
  {
    id: "amusement-park",
    name: "Amusement Park",
    markerUrl: "/assets/markers/amusement-park.png",
    parentId: "park",
  },
  {
    id: "walkway",
    name: "Walkway",
    markerUrl: "/assets/markers/walkway.png",
    parentId: "park",
  },
  {
    id: "health",
    name: "Health",
    markerUrl: "/assets/markers/health.png",
  },
  {
    id: "hospital",
    name: "Hospital",
    markerUrl: "/assets/markers/hospital.png",
    parentId: "health",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    markerUrl: "/assets/markers/pharmacy.png",
    parentId: "health",
  },
  {
    id: "food",
    name: "Food",
    markerUrl: "/assets/markers/food.png",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    markerUrl: "/assets/markers/restaurant.png",
    parentId: "food",
  },
  {
    id: "fast-food",
    name: "Fast Food",
    markerUrl: "/assets/markers/fast.png",
    parentId: "food",
  },
  {
    id: "beverage",
    name: "Beverage",
    markerUrl: "/assets/markers/beverage.png",
    parentId: "food",
  },
  {
    id: "fitness",
    name: "Fitness",
    markerUrl: "/assets/markers/fitness.png",
  },
  {
    id: "shopping-mall",
    name: "Shopping Mall",
    markerUrl: "/assets/markers/shopping-mall.png",
  },
  {
    id: "hotel",
    name: "Hotel",
    markerUrl: "/assets/markers/hotel.png",
  },
  {
    id: "scenery",
    name: "Scenery",
    markerUrl: "/assets/markers/scenery.png",
  },
  {
    id: "other",
    name: "Other",
    markerUrl: "/assets/markers/other.png",
  },
  {
    id: "bank",
    name: "Bank",
    markerUrl: "/assets/markers/bank.png",
    parentId: "other",
  },
  {
    id: "atm",
    name: "ATM",
    markerUrl: "/assets/markers/atm.png",
    parentId: "other",
  },
  {
    id: "police",
    name: "Police",
    markerUrl: "/assets/markers/police.png",
    parentId: "other",
  },
  {
    id: "apartment-rental",
    name: "Apartment Rental",
    markerUrl: "/assets/markers/other.png",
    parentId: "other",
  },
];

export default categories;

export const categoryIcons: Record<
  string,
  (props: TablerIconsProps) => JSX.Element
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
