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

import Alert from "~/components/ui/Alert";
import Spinner from "~/components/ui/Spinner";
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

interface MapPropsBase {
  allPlaces: Place[];
  visiblePlaces: Place[];
  center?: [number, number];
  zoom: number;
  zooms: [number, number];
}

interface MapPropsWithWillChangeCenterWhenFocusChanges extends MapPropsBase {
  willChangeCenterWhenFocusChanges: boolean;
  setWillChangeCenterWhenFocusChanges: (value: boolean) => void;
}

export type MapProps = MapPropsBase &
  MapPropsWithWillChangeCenterWhenFocusChanges;

export default function Map({
  allPlaces,
  visiblePlaces,
  center: defaultCenter,
  zoom,
  zooms,
  willChangeCenterWhenFocusChanges,
  setWillChangeCenterWhenFocusChanges,
}: MapProps) {
  const { focus, setFocus } = useAppMapContext();
  const [center, setCenter] = useState<[number, number]>();

  const [loading, setLoading] = useState(true);
  const [showLoadingTip, setShowLoadingTip] = useState(false);

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

  /** Show loading tip if loading takes longer than 3 seconds. */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      timer = setTimeout(() => {
        setShowLoadingTip(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  /**
   * Change map center when `focus` changes.
   *
   * Does nothing if `focus` is not set, except when
   * `willChangeCenterWhenFocusChanges` is true, sets the center to default.
   */
  useEffect(() => {
    if (!focus) {
      if (!willChangeCenterWhenFocusChanges)
        return console.log("[Map] `focus` was cleared");
      console.log(
        `[Map] \`focus\` was cleared, but \`willChangeCenterWhenFocusChanges\` is true. Setting center to \`${
          defaultCenter ? "defaultCenter" : "fitCenter"
        }\` (`,
        defaultCenter ?? fitCenter,
        ")"
      );
      setCenter(defaultCenter ?? fitCenter);
      setWillChangeCenterWhenFocusChanges(false);
      return;
    }
    console.log(
      "[Map] `focus` changed to",
      focus,
      ", setting center to",
      focus.location
    );
    setCenter(focus.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  /**
   * Reset map center when `defaultCenter` changes.
   *
   * Does nothing when `defaultCenter` is not set or when `focus` is set (often
   * at startup).
   */
  useEffect(() => {
    if (!defaultCenter || focus) return;
    console.log(
      "[Map] `defaultCenter` changed to",
      defaultCenter,
      ", resetting center to this new value"
    );
    setCenter(defaultCenter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCenter]);

  /**
   * Reset map center when `fitCenter` changes.
   *
   * Does nothing when `defaultCenter` is set or when `focus` is set (often at
   * startup).
   */
  useEffect(() => {
    if (defaultCenter || focus) return;
    console.log(
      "[Map] `fitCenter` changed to",
      fitCenter,
      ", resetting center to this new value"
    );
    setCenter(fitCenter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitCenter]);

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div className="relative h-full w-full">
      <APILoader akey="***REMOVED***" version="2.0.5">
        <ReactMap
          showIndoorMap
          center={center}
          features={["bg", "road", "building"]}
          mapStyle={darkMode ? "amap://styles/dark" : "amap://styles/normal"}
          scrollWheel={!focus}
          zoom={zoom}
          zooms={zooms}
          onComplete={() => setLoading(false)}
          onMapMove={() => setLoading(false)}
          onZoomChange={() => setLoading(false)}
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
      {loading && (
        <div className="absolute left-0 right-0 top-0">
          <Alert
            className="rounded-none border-none transition-all"
            variant="dark"
          >
            <Spinner className="mr-3 inline h-5 w-5 flex-shrink-0" size={20} />
            <div className="flex flex-col">
              Loading map assets...
              {showLoadingTip && (
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  Try turning off your proxy or VPN if this is taking too long.
                  If the map is instead already loaded, interacting with the map
                  will automatically hide this message.
                </span>
              )}
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
}
