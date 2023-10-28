import {
  type DependencyList,
  type EffectCallback,
  useEffect,
  useState,
} from "react";
import { useHydrated } from "remix-utils/use-hydrated";

export function useHydratedEffect(
  effect: EffectCallback,
  deps?: DependencyList,
) {
  /* eslint-disable hooks/sort */
  const hydrated = useHydrated();
  useEffect(() => {
    if (!hydrated) return;
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  /* eslint-enable hooks/sort */
}

export function useDelayedBoolean(value: boolean, delay: number = 3000) {
  const [delayedValue, setDelayedValue] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (value) {
      timer = setTimeout(() => {
        setDelayedValue(true);
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [delay, value]);
  return delayedValue;
}

export function useUpdateQueryStringValueWithoutNavigation(
  queryKey: string,
  queryValue: string,
) {
  useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const oldQuery = currentSearchParams.get(queryKey) ?? "";
    if (queryValue === oldQuery) return;

    if (queryValue) {
      currentSearchParams.set(queryKey, queryValue);
    } else {
      currentSearchParams.delete(queryKey);
    }
    const newUrl = [window.location.pathname, currentSearchParams.toString()]
      .filter(Boolean)
      .join("?");
    // alright, let's talk about this...
    // Normally with remix, you'd update the params via useSearchParams from react-router-dom
    // and updating the search params will trigger the search to update for you.
    // However, it also triggers a navigation to the new url, which will trigger
    // the loader to run which we do not want because all our data is already
    // on the client and we're just doing client-side filtering of data we
    // already have. So we manually call `window.history.pushState` to avoid
    // the router from triggering the loader.
    window.history.replaceState(null, "", newUrl);
  }, [queryKey, queryValue]);
}
