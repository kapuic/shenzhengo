import { useFeatureIsOn } from "@growthbook/growthbook-react";
import {
  APILoader,
  ControlBarControl,
  Map as AMapMap,
  ScaleControl,
  ToolBarControl,
} from "@uiw/react-amap";
import { isEqual } from "lodash";
import { useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import Alert from "~/components/Alert";
import Spinner from "~/components/Spinner";
import { useDelayedBoolean } from "~/utilities/hooks";

import { useAppMapContext } from "../../AppMapContext";
import { type Place } from "../../types";
import PlacePopover from "../PlacePopover";
import PlaceSheet from "../PlaceSheet";
import {
  useSetCenterWhenDefaultCenterChanges,
  useSetCenterWhenFitCenterChanges,
  useSetCenterWhenFocusChanges,
} from "./hooks";
import Marker from "./Marker";

interface MapPropsBase {
  allPlaces: Place[];
  visiblePlaces: Place[];
  center?: [number, number];
  zoom: number;
  zooms: [number, number];
}

interface MapPropsWithWillResetCenterWhenFocusClears extends MapPropsBase {
  willResetCenterWhenFocusClears: boolean;
  setWillResetCenterWhenFocusClears: (value: boolean) => void;
}

export type MapProps = MapPropsBase &
  MapPropsWithWillResetCenterWhenFocusClears;

export default function Map({
  allPlaces,
  visiblePlaces,
  center: defaultCenter,
  zoom,
  zooms,
  willResetCenterWhenFocusClears: willResetWhenFocusClears,
  setWillResetCenterWhenFocusClears: setWillResetWhenFocusClears,
}: MapProps) {
  const enableScaleControl = useFeatureIsOn("map:scale-control");
  const enableToolbarControl = useFeatureIsOn("map:toolbar-control");
  const enableCompassControl = useFeatureIsOn("map:compass-control");
  const enableLoadingMessage = useFeatureIsOn("map:loading-message");

  const { focus, setFocus } = useAppMapContext();
  const [center, setCenter] = useState<[number, number]>();

  const [loading, setLoading] = useState(true);
  const showLoadingTip = useDelayedBoolean(loading);

  const fitCenter = useMemo(
    () =>
      visiblePlaces
        .reduce(
          (acc, { location }) => [acc[0] + location[0], acc[1] + location[1]],
          [0, 0],
        )
        .map((coord) => coord / visiblePlaces.length) as [number, number],
    [visiblePlaces],
  );

  useSetCenterWhenFocusChanges({
    focus,
    setCenter,
    willResetWhenFocusClears,
    setWillResetWhenFocusClears,
    defaultCenter,
    fitCenter,
  });
  useSetCenterWhenDefaultCenterChanges({ defaultCenter, setCenter, focus });
  useSetCenterWhenFitCenterChanges({
    fitCenter,
    setCenter,
    defaultCenter,
    focus,
  });

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div className="relative z-10 h-full w-full">
      <APILoader akey="***REMOVED***" version="2.0.5">
        <AMapMap
          showIndoorMap
          center={center}
          className="bg-transparent"
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
            {enableScaleControl && (
              <ScaleControl offset={[20, 30]} position="LB" />
            )}
            {enableToolbarControl && (
              <ToolBarControl offset={[20, 20]} position="RB" />
            )}
            {enableCompassControl && (
              <ControlBarControl offset={[20, 20]} position="RT" />
            )}
            {allPlaces.map((place, i) => (
              <Marker
                key={i}
                place={place}
                visible={visiblePlaces.some(({ location }) =>
                  isEqual(location, place.location),
                )}
              />
            ))}
            <PlacePopover />
            <PlaceSheet />
          </>
        </AMapMap>
      </APILoader>
      {enableLoadingMessage && loading && (
        <div className="absolute left-0 right-0 top-0">
          <Alert
            className="rounded-none border-none transition-all"
            variant="dark"
          >
            <Spinner className="mr-3 inline h-5 w-5 flex-shrink-0" size={20} />
            <div className="flex flex-col">
              Loading map assets...
              {showLoadingTip && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
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
