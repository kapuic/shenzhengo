import {
  IconBarbell,
  IconBuildingCarousel,
  IconBuildingHospital,
  IconChefHat,
  IconGlassFull,
  IconIceCream,
  IconMedicalCross,
  IconShoppingBag,
  IconToolsKitchen2,
  IconTrees,
  IconVaccineBottle,
  IconWalk,
} from "@tabler/icons-react";

export const enum PointOfInterestType {
  Park,
  AmusementPark,
  Walkway,

  Health,
  HealthHospital,
  HealthPharmacy,

  Food,
  FoodRestaurant,
  FoodFast,
  FoodBeverage,

  Fitness,

  ShoppingMall,
}

export const PointOfInterestTypeNames = {
  [PointOfInterestType.Park]: "Park",
  [PointOfInterestType.AmusementPark]: "Amusement Park",
  [PointOfInterestType.Walkway]: "Walkway",

  [PointOfInterestType.Health]: "Health",
  [PointOfInterestType.HealthHospital]: "Hospital",
  [PointOfInterestType.HealthPharmacy]: "Pharmacy",

  [PointOfInterestType.Food]: "Food",
  [PointOfInterestType.FoodRestaurant]: "Restaurant",
  [PointOfInterestType.FoodFast]: "Fast Food",
  [PointOfInterestType.FoodBeverage]: "Beverage",

  [PointOfInterestType.Fitness]: "Fitness",

  [PointOfInterestType.ShoppingMall]: "Shopping Mall",
};

export const PointOfInterestTypeIcons = {
  [PointOfInterestType.Park]: IconTrees,
  [PointOfInterestType.AmusementPark]: IconBuildingCarousel,
  [PointOfInterestType.Walkway]: IconWalk,

  [PointOfInterestType.Health]: IconMedicalCross,
  [PointOfInterestType.HealthHospital]: IconBuildingHospital,
  [PointOfInterestType.HealthPharmacy]: IconVaccineBottle,

  [PointOfInterestType.Food]: IconToolsKitchen2,
  [PointOfInterestType.FoodRestaurant]: IconChefHat,
  [PointOfInterestType.FoodFast]: IconIceCream,
  [PointOfInterestType.FoodBeverage]: IconGlassFull,

  [PointOfInterestType.Fitness]: IconBarbell,

  [PointOfInterestType.ShoppingMall]: IconShoppingBag,
};

export const PointOfInterestTypeMarkerUrl = {
  [PointOfInterestType.Park]: "/assets/markers/park.png",
  [PointOfInterestType.AmusementPark]: "/assets/markers/amusement-park.png",

  [PointOfInterestType.HealthHospital]: "/assets/markers/hospital.png",
  [PointOfInterestType.HealthPharmacy]: "/assets/markers/pharmacy.png",

  [PointOfInterestType.FoodRestaurant]: "/assets/markers/restaurant.png",
  [PointOfInterestType.FoodFast]: "/assets/markers/fast.png",
  [PointOfInterestType.FoodBeverage]: "/assets/markers/beverage.png",

  [PointOfInterestType.Fitness]: "/assets/markers/fitness.png",

  [PointOfInterestType.ShoppingMall]: "/assets/markers/shopping-mall.png",
};
