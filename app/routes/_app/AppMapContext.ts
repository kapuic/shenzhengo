import { createContext, useContext } from "react";

import { type Place } from "./types";

interface AppMapContextData {
  focus: Place | null;
  setFocus: (place: Place | null) => void;
}

const AppMapContext = createContext<AppMapContextData>({
  focus: null,
  setFocus: () => {},
});

export default AppMapContext;

export function useAppMapContext() {
  return useContext(AppMapContext);
}
