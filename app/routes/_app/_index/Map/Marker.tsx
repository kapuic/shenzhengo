import { useFeatureIsOn, useFeatureValue } from "@growthbook/growthbook-react";
import { LabelMarker, Marker as AMapMarker } from "@uiw/react-amap";
import { isEqual } from "lodash";

import { getCategoryMarkerIcon } from "~/data/categories";
import { type Place } from "~/data/schema";

import { useAppMapContext } from "../../AppMapContext";

export interface MarkerProps {
  place: Place;
  visible: boolean;
}

export default function Marker({ place, visible }: MarkerProps) {
  const enableDynamicMarkers = useFeatureIsOn("map:dynamic-markers");
  const markerIconQuality = useFeatureValue<number>(
    "map:marker-icon-quality",
    2,
  );

  const { focus, setFocus } = useAppMapContext();
  const focused = isEqual(focus?.location, place.location);
  const markerIcon = getCategoryMarkerIcon(place.categoryId, markerIconQuality);

  return enableDynamicMarkers ? (
    <>
      <LabelMarker
        name={place.name}
        position={place.location}
        text={{ title: place.name, topWhenClick: true }}
        visible={visible && !focused}
        zooms={[2, 15]}
        icon={{
          image: markerIcon,
          imageOffset: [-16, -37],
          imageSize: [32, 37],
          size: [32 * 0.5, 37 * 0.5],
        }}
        onClick={() => setFocus(focus ? null : place)}
      />
      <LabelMarker
        name={place.name}
        position={place.location}
        text={{ title: place.name, topWhenClick: true }}
        visible={visible && !focused}
        zooms={[15, 20]}
        icon={{
          image: markerIcon,
          imageOffset: [-16, -37],
          imageSize: [32, 37],
          size: [32 * 0.75, 37 * 0.75],
        }}
        onClick={() => setFocus(focus ? null : place)}
      />
      <LabelMarker
        name={place.name}
        position={place.location}
        visible={visible && !focused}
        zooms={[17, 20]}
        icon={{
          image: markerIcon,
          imageOffset: [-16, -37],
          imageSize: [32, 37],
          size: [32 * 1, 37 * 1],
        }}
        text={{
          title: place.name,
          topWhenClick: true,
          // Text hidden since styling does not work; probably caused by an issue in `@uiw/react-amap`.
          // content: place.name,
          // direction: "right",
          // style: {
          //   "-webkit-background-clip": "text",
          //   "-webkit-text-fill-color": "transparent",
          //   "font-family": `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
          //   "font-size": "0.875rem",
          //   "font-weight": "bold",
          //   background: `-webkit-linear-gradient(${colors.light}, ${colors.dark})`,
          // },
        }}
        onClick={() => setFocus(focus ? null : place)}
      />
      <LabelMarker
        name={place.name}
        position={place.location}
        rank={2}
        visible={visible && focused}
        icon={{
          image: markerIcon,
          imageOffset: [-16, -37],
          imageSize: [32, 37],
          size: [32 * 1.5, 37 * 1.5],
        }}
        text={{
          title: place.name,
          topWhenClick: true,
          // Text hidden since styling does not work; probably caused by an issue in `@uiw/react-amap`.
          // content: place.name,
          // direction: "bottom",
          // style: {
          //   "-webkit-background-clip": "text",
          //   "-webkit-text-fill-color": "transparent",
          //   "font-family": `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
          //   "font-size": "0.875rem",
          //   "font-weight": "bold",
          //   background: `-webkit-linear-gradient(${colors.light}, ${colors.dark})`,
          // },
        }}
        onClick={() => setFocus(null)}
      />
    </>
  ) : (
    <AMapMarker
      topWhenClick
      icon={markerIcon}
      offset={new AMap.Pixel(-16, -37)}
      position={place.location}
      title={place.name}
      visible={visible}
      onClick={() => setFocus(focus ? null : place)}
    />
  );
}
