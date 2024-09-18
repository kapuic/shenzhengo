import { Marker as AMapMarker } from "@uiw/react-amap";

import { getCategoryMarkerIcon } from "~/data/categories";
import { type Place } from "~/data/schema";

import { useAppLoaderData } from "../..";
import { useAppMapContext } from "../../AppMapContext";

export interface MarkerProps {
  place: Place;
  visible: boolean;
}

export default function Marker({ place, visible }: MarkerProps) {
  const { categories } = useAppLoaderData();

  const { focus, setFocus } = useAppMapContext();
  const markerIcon = getCategoryMarkerIcon(place.categoryId);

  return (
    <AMapMarker
      topWhenClick
      icon={markerIcon}
      offset={new AMap.Pixel(-16, -37)}
      position={place.location}
      title={place.name}
      visiable={visible}
      onClick={() => setFocus(focus ? null : place)}
    />
  );
}
