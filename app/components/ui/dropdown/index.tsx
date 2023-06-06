import { type HTMLAttributes, useContext } from "react";
import { createContext, useId } from "react";
import { twMerge } from "tailwind-merge";

import DropdownButton from "./DropdownButton";
import DropdownItem from "./DropdownItem";
import DropdownMenu from "./DropdownMenu";
import DropdownTarget from "./DropdownTarget";

export interface DropdownContextValue {
  meunId: string;
}

export const DropdownContext = createContext<DropdownContextValue>({
  meunId: "",
});

export function useDropdownContext() {
  return useContext(DropdownContext);
}

export default function Dropdown({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const meunId = useId();

  return (
    <DropdownContext.Provider value={{ meunId }}>
      <details
        className={twMerge("group relative inline-flex", className?.toString())}
        {...props}
      >
        {children}
      </details>
    </DropdownContext.Provider>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
Dropdown.Target = DropdownTarget;
