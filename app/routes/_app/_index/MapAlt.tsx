import {
  APILoader,
  ControlBarControl,
  Map as ReactMap,
  type MapProps as ReactMapProps,
  ScaleControl,
  ToolBarControl,
} from "@uiw/react-amap";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

import { getPointOfInterestTypeMarkerUrl } from "~/utilities/data";

import { useAppMapContext } from "../AppMapContext";
import { type Place } from "../types";
import PlacePopover from "./PlacePopover";
import PlaceSheet from "./PlaceSheet";

/** @ignore */
export interface MapProps {
  places: Place[];
  zoom: number;
}

/** @ignore */
export default function Map({ places, zoom }: MapProps) {
  const { focus, setFocus } = useAppMapContext();
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const ref = useRef<
    ReactMapProps & {
      AMap: typeof AMap;
      map: AMap.Map;
      container?: HTMLDivElement | null;
    }
  >(null);

  useEffect(() => {
    if (focus) ref.current?.map.setCenter(focus.location);
  }, [focus]);
  useEffect(() => {
    ref.current?.map.setZoom(zoom);
  }, [zoom]);
  useEffect(() => {
    const map = ref.current?.map;
    const AMap = ref.current?.AMap;
    if (!map || !AMap) return;
    const markers = places.map((place) => {
      const marker = new AMap.Marker({
        topWhenClick: true,
        icon: getPointOfInterestTypeMarkerUrl(place.type),
        offset: new AMap.Pixel(-16, -37),
        position: place.location,
        title: place.name,
      });
      marker.on("click", () => setFocus(focus ? null : place));
      return marker;
    });
    map?.add(markers);
    return () => map?.remove(markers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  return (
    <APILoader akey="***REMOVED***" version="2.0.5">
      <ReactMap
        ref={ref}
        showIndoorMap
        center={[114.31, 22.6]}
        className="h-full w-full bg-white dark:bg-gray-900"
        features={["bg", "road", "building"]}
        mapStyle={darkMode ? "amap://styles/dark" : "amap://styles/normal"}
        scrollWheel={!focus}
        zoom={15}
        onClick={({ target }) => {
          if (!(target instanceof AMap.Marker)) setFocus(null);
        }}
      >
        <>
          <ScaleControl offset={[20, 30]} position="LB" />
          <ToolBarControl offset={[20, 20]} position="RB" />
          <ControlBarControl offset={[20, 20]} position="RT" />
          {/* {places.map((place, i) => (
            <CustomMarker key={i} place={place} />
          ))} */}
          <PlacePopover />
          <PlaceSheet />
        </>
      </ReactMap>
    </APILoader>
  );
}
