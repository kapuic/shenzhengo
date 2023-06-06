import {
  APILoader,
  ControlBarControl,
  Map as ReactMap,
  Marker,
  ScaleControl,
  ToolBarControl,
} from "@uiw/react-amap";
import { useEffect, useState } from "react";

import { getPointOfInterestTypeMarkerUrl } from "~/utilities/data";
import { useMediaQuery } from "~/utilities/hooks";

import { useAppMapContext } from "../AppMapContext";
import { type Place } from "../types";
import PlacePopover from "./PlacePopover";
import PlaceSheet from "./PlaceSheet";

interface CustomMarkerProps {
  place: Place;
}

function CustomMarker({ place }: CustomMarkerProps) {
  const { focus, setFocus } = useAppMapContext();

  return (
    <Marker
      topWhenClick
      icon={getPointOfInterestTypeMarkerUrl(place.type)}
      offset={new AMap.Pixel(-16, -37)}
      position={place.location}
      title={place.name}
      onClick={() => setFocus(focus ? null : place)}
    />
  );
}

export interface MapProps {
  places: Place[];
}

export default function Map({ places }: MapProps) {
  const { focus, setFocus } = useAppMapContext();
  const [center, setCenter] = useState<[number, number]>([114.31, 22.6]);
  useEffect(() => {
    if (focus) setCenter(focus.location);
  }, [focus]);

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <APILoader akey="***REMOVED***" version="2.0.5">
      <ReactMap
        showIndoorMap
        center={center}
        className="h-full w-full bg-white dark:bg-gray-900"
        features={["bg", "road", "building"]}
        mapStyle={darkMode ? "amap://styles/dark" : "amap://styles/normal"}
        scrollWheel={!focus}
        zoom={15}
        zooms={[14, 18]}
        onClick={({ target }) => {
          if (!(target instanceof AMap.Marker)) setFocus(null);
        }}
      >
        <>
          <ScaleControl offset={[20, 30]} position="LB" />
          <ToolBarControl offset={[20, 20]} position="RB" />
          <ControlBarControl offset={[20, 20]} position="RT" />
          {places.map((place, i) => (
            <CustomMarker key={i} place={place} />
          ))}
          <PlacePopover />
          <PlaceSheet />
        </>
      </ReactMap>
    </APILoader>
  );
}
