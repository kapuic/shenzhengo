import { useFeatureIsOn } from "@growthbook/growthbook-react";
import {
  APILoader,
  ControlBarControl,
  Map as AMapMap,
  ScaleControl,
  ToolBarControl,
} from "@uiw/react-amap";
import { isEqual } from "lodash";
import { useMemo, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import Alert from "~/components/Alert";
import Spinner from "~/components/Spinner";
import { type Place } from "~/data/schema";
import { useRootLoaderData } from "~/root";
import { useDelayedBoolean } from "~/utilities/hooks";

import { useAppLoaderData } from "../..";
import { useAppMapContext } from "../../AppMapContext";
import PlacePopover from "../PlacePopover";
import PlaceSheet from "../PlaceSheet";
import {
  useAutoSetRange,
  useRecenterWhenDefaultCenterChanges,
  useRecenterWhenFitCenterChanges,
  useRecenterWhenFocusChanges,
} from "./hooks";
import Marker from "./Marker";

interface MapPropsBase {
  allPlaces: Place[];
  filteredPlaces: Place[];
  visiblePlaces: Place[];
  center?: [number, number];
  zoom: number;
  zooms: [number, number];
  filterRange?: string;
  setFilterRange?: (rangeId: string) => void;
}

interface MapPropsWithWillResetCenterWhenFocusClears extends MapPropsBase {
  willRecenterWhenFocusClears?: boolean;
  setWillRecenterWhenFocusClears?: (value: boolean) => void;
}

export type MapProps = MapPropsBase &
  MapPropsWithWillResetCenterWhenFocusClears;

export default function Map({
  allPlaces,
  filteredPlaces,
  visiblePlaces,
  center: defaultCenter,
  zoom,
  zooms,
  filterRange,
  setFilterRange,
  willRecenterWhenFocusClears,
  setWillRecenterWhenFocusClears,
}: MapProps) {
  const { aMap } = useRootLoaderData();

  const enableUIRedesign = useFeatureIsOn("map:ui-redesign");
  const enableScaleControl = useFeatureIsOn("map:scale-control");
  const enableToolbarControl = useFeatureIsOn("map:toolbar-control");
  const enableCompassControl = useFeatureIsOn("map:compass-control");
  const enableLoadingMessage = useFeatureIsOn("map:loading-message");

  const { ranges } = useAppLoaderData();
  const { focus, setFocus } = useAppMapContext();

  const [loading, setLoading] = useState(true);
  const showLoadingTip = useDelayedBoolean(loading);

  // eslint-disable-next-line hooks/sort
  const fitCenter = useMemo(
    () =>
      filteredPlaces.length !== 0
        ? (filteredPlaces
            .reduce(
              (acc, { location }) => [
                acc[0] + location[0],
                acc[1] + location[1],
              ],
              [0, 0],
            )
            .map((coord) => coord / filteredPlaces.length) as [number, number])
        : null,
    [filteredPlaces],
  );
  const initialCenter = useRef(
    focus?.location ?? defaultCenter ?? fitCenter ?? undefined,
  );

  const mapRef = useRef<React.ElementRef<typeof AMapMap>>(null);
  function setCenter(center: [number, number], causedByFocusCleared?: boolean) {
    if (!mapRef.current?.map) return;
    if (causedByFocusCleared === false && mapRef.current.map.getZoom(0) < 17)
      mapRef.current.map.setZoomAndCenter(17, center, false, 1000);
    else mapRef.current.map.setCenter(center);
  }

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

  // Should move to `index.tsx` after upgrading to React 18.
  // TODO: Set default zoom for a place opened using query params.
  // eslint-disable-next-line hooks/sort
  const [currentBounds, setCurrentBounds] = useState<AMap.Bounds | null>(null);
  function updateCurrentBounds() {
    if (!mapRef.current?.map) return;
    setCurrentBounds(mapRef.current.map.getBounds());
  }
  useAutoSetRange({
    ranges,
    allPlaces,
    currentBounds,
    focus,
    filterRange,
    setFilterRange,
  });

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div aria-hidden className="relative z-10 h-full w-full">
      <APILoader akey={aMap.apiKey} version={aMap.apiVersion}>
        <AMapMap
          ref={mapRef}
          showIndoorMap
          center={initialCenter.current}
          className="bg-transparent"
          features={["bg", "road", "building"]}
          mapStyle={darkMode ? "amap://styles/dark" : "amap://styles/normal"}
          scrollWheel={!focus}
          zoom={zoom}
          zooms={zooms}
          onComplete={() => setLoading(false)}
          onMoveEnd={updateCurrentBounds}
          onMoveStart={() => setLoading(false)}
          onZoomEnd={updateCurrentBounds}
          onZoomStart={() => setLoading(false)}
          onClick={({ target }) => {
            if (!(target instanceof AMap.Marker)) setFocus(null);
          }}
        >
          <>
            {enableScaleControl && (
              <ScaleControl offset={[20, 30]} position="LB" />
            )}
            {enableToolbarControl &&
              (enableUIRedesign ? (
                <ToolBarControl offset={[120, 20]} position="RB" />
              ) : (
                <ToolBarControl offset={[20, 20]} position="RB" />
              ))}
            {enableCompassControl &&
              (enableUIRedesign ? (
                <ControlBarControl offset={[20, 10]} position="RB" />
              ) : (
                <ControlBarControl offset={[20, 20]} position="RT" />
              ))}
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
