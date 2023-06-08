import {
  APILoader,
  ControlBarControl,
  Map as ReactMap,
  Marker,
  ScaleControl,
  ToolBarControl,
} from "@uiw/react-amap";
import { isEqual } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { getPointOfInterestTypeMarkerUrl } from "~/utilities/data";

import { useAppMapContext } from "../AppMapContext";
import { type Place } from "../types";
import PlacePopover from "./PlacePopover";
import PlaceSheet from "./PlaceSheet";

interface CustomMarkerProps {
  place: Place;
  visible: boolean;
}

function CustomMarker({ place, visible }: CustomMarkerProps) {
  const { focus, setFocus } = useAppMapContext();

  return (
    <Marker
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

export interface MapProps {
  allPlaces: Place[];
  visiblePlaces: Place[];
  center?: [number, number];
  zoom: number;
  zooms: [number, number];
}

export default function Map({
  allPlaces,
  visiblePlaces,
  center: defaultCenter,
  zoom,
  zooms,
}: MapProps) {
  const { focus, setFocus } = useAppMapContext();

  const [center, setCenter] = useState<[number, number]>();
  const fitCenter = useMemo(
    () =>
      visiblePlaces
        .reduce(
          (acc, { location }) => [acc[0] + location[0], acc[1] + location[1]],
          [0, 0]
        )
        .map((coord) => coord / visiblePlaces.length) as [number, number],
    [visiblePlaces]
  );
  useEffect(() => {
    if (!focus) return console.log("[Map] `focus` was cleared");
    console.log(
      "[Map] `focus` changed to",
      focus,
      ", setting center to",
      focus.location
    );
    setCenter(focus.location);
  }, [focus]);
  useEffect(() => {
    if (!defaultCenter) return;
    console.log(
      "[Map] `defaultCenter` changed to",
      defaultCenter,
      ", resetting center to this new value",
      defaultCenter
    );
    setCenter(defaultCenter);
  }, [defaultCenter]);
  useEffect(() => {
    if (defaultCenter) return;
    console.log(
      "[Map] `fitCenter` changed to",
      fitCenter,
      ", resetting center to this new value",
      fitCenter
    );
    setCenter(fitCenter);
  }, [defaultCenter, fitCenter]);

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
        zoom={zoom}
        zooms={zooms}
        onClick={({ target }) => {
          if (!(target instanceof AMap.Marker)) setFocus(null);
        }}
      >
        <>
          <ScaleControl offset={[20, 30]} position="LB" />
          <ToolBarControl offset={[20, 20]} position="RB" />
          <ControlBarControl offset={[20, 20]} position="RT" />
          {allPlaces.map((place, i) => (
            <CustomMarker
              key={i}
              place={place}
              visible={visiblePlaces.some(({ location }) =>
                isEqual(location, place.location)
              )}
            />
          ))}
          <PlacePopover />
          <PlaceSheet />
        </>
      </ReactMap>
    </APILoader>
  );
}
