import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";

import DropdownButton from "./DropdownButton";
import DropdownItem from "./DropdownItem";
import DropdownMenu from "./DropdownMenu";
import DropdownTarget from "./DropdownTarget";

export interface DropdownContextValue {
  menuId: string;
}

export const DropdownContext = createContext<DropdownContextValue>({
  menuId: "",
});

export function useDropdownContext() {
  return useContext(DropdownContext);
}

export default function Dropdown({
  children,
  className,
  ...props
}: React.ComponentProps<"details">) {
  const menuId = useId();

  return (
    <DropdownContext.Provider value={{ menuId }}>
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
