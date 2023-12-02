import { Marker as AMapMarker } from "@uiw/react-amap";

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

  return (
    <AMapMarker
      topWhenClick
      icon={categories.find(({ id }) => id === place.categoryId)?.markerUrl}
      offset={new AMap.Pixel(-16, -37)}
      position={place.location}
      title={place.originalName}
      visiable={visible}
      onClick={() => setFocus(focus ? null : place)}
    />
  );
}
