import { isEqual } from "lodash";

import activities from "~/data/activities";
import placesCitywide from "~/data/places/citywide";
import placesNearby from "~/data/places/nearby";
import {
  type PointOfInterestType,
  PointOfInterestTypeIcons,
  PointOfInterestTypeMarkerUrl,
  PointOfInterestTypeNames,
} from "~/data/types";
import { type Place } from "~/routes/_app/types";

export function getPointOfInterestTypeName(type: PointOfInterestType) {
  return PointOfInterestTypeNames[type];
}

export function getPointOfInterestTypeIcon(type: PointOfInterestType) {
  return PointOfInterestTypeIcons[type];
}

export function getPointOfInterestTypeMarkerUrl(type: PointOfInterestType) {
  return (
    PointOfInterestTypeMarkerUrl[
      type as keyof typeof PointOfInterestTypeMarkerUrl
    ] ?? "/assets/markers/default.png"
  );
}

export interface GetPlacesOptions {
  nearby?: boolean;
  citywide?: boolean;
}

export function getPlaceByLocation(
  location: [number, number],
  options: GetPlacesOptions = { nearby: true, citywide: true }
) {
  return [
    ...(options.nearby ? placesNearby : []),
    ...(options.citywide ? placesCitywide : []),
  ].find((place) => isEqual(place.location, location));
}

export function getPlacesByType(
  type: PointOfInterestType,
  options: GetPlacesOptions = { nearby: true, citywide: true }
) {
  return [
    ...(options.nearby ? placesNearby : []),
    ...(options.citywide ? placesCitywide : []),
  ].filter((place) => place.type === type);
}

export function getActivitiesByPlace(place: Place) {
  return activities.filter(
    (activity) =>
      activity.associated_places?.some((location) =>
        isEqual(location, place.location)
      ) || activity.associated_types?.includes(place.type)
  );
}
