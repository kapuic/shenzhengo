import { createContext, useContext } from "react";

import { type Place } from "~/data/schema";

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
