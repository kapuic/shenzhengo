import { Marker as AMapMarker } from "@uiw/react-amap";

import { getPointOfInterestTypeMarkerUrl } from "~/utilities/data";

import { useAppMapContext } from "../../AppMapContext";
import { type Place } from "../../types";

export interface MarkerProps {
  place: Place;
  visible: boolean;
}

export default function Marker({ place, visible }: MarkerProps) {
  const { focus, setFocus } = useAppMapContext();

  return (
    <AMapMarker
      topWhenClick
      icon={getPointOfInterestTypeMarkerUrl(place.type)}
      offset={new AMap.Pixel(-16, -37)}
      position={place.location}
      title={place.name}
      visiable={visible}
      onClick={() => setFocus(focus ? null : place)}
    />
  );
}
