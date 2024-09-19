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
import { type Place } from "~/data/schema";
import { useRootLoaderData } from "~/root";
import { useDelayedBoolean } from "~/utilities/hooks";

import { useAppMapContext } from "../../AppMapContext";
import PlacePopover from "../PlacePopover";
import PlaceSheet from "../PlaceSheet";
import {
  useRecenterWhenDefaultCenterChanges,
  useRecenterWhenFitCenterChanges,
  useRecenterWhenFocusChanges,
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
  willRecenterWhenFocusClears: boolean;
  setWillRecenterWhenFocusClears: (value: boolean) => void;
}

export type MapProps = MapPropsBase &
  MapPropsWithWillResetCenterWhenFocusClears;

export default function Map({
  allPlaces,
  visiblePlaces,
  center: defaultCenter,
  zoom,
  zooms,
  willRecenterWhenFocusClears,
  setWillRecenterWhenFocusClears,
}: MapProps) {
  const { aMap } = useRootLoaderData();

  const enableScaleControl = useFeatureIsOn("map:scale-control");
  const enableToolbarControl = useFeatureIsOn("map:toolbar-control");
  const enableCompassControl = useFeatureIsOn("map:compass-control");
  const enableShowAllMarkers = useFeatureIsOn("map:all-markers");
  const enableLoadingMessage = useFeatureIsOn("map:loading-message");

  const { focus, setFocus } = useAppMapContext();
  const [center, setCenter] = useState<[number, number]>();

  const [loading, setLoading] = useState(true);
  const showLoadingTip = useDelayedBoolean(loading);

  const fitCenter = useMemo(
    () =>
      visiblePlaces.length !== 0
        ? (visiblePlaces
            .reduce(
              (acc, { location }) => [
                acc[0] + location[0],
                acc[1] + location[1],
              ],
              [0, 0],
            )
            .map((coord) => coord / visiblePlaces.length) as [number, number])
        : null,
    [visiblePlaces],
  );

  useRecenterWhenFocusChanges({
    setCenter,
    focus,
    defaultCenter,
    fitCenter,
    willRecenterWhenFocusClears,
    setWillRecenterWhenFocusClears,
  });
  useRecenterWhenDefaultCenterChanges({ setCenter, focus, defaultCenter });
  useRecenterWhenFitCenterChanges({
    setCenter,
    focus,
    defaultCenter,
    fitCenter,
  });

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div aria-hidden className="relative z-10 h-full w-full">
      <APILoader akey={aMap.apiKey} version={aMap.apiVersion}>
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
                visible={
                  enableShowAllMarkers ||
                  visiblePlaces.some(({ location }) =>
                    isEqual(location, place.location),
                  )
                }
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
            <div className="flex flex-col gap-1">
              Loading map assets...
              {showLoadingTip && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Check your network connection if the map is taking too long to
                  load. Tip: Try turning off your proxy or VPN.
                </span>
              )}
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
}
