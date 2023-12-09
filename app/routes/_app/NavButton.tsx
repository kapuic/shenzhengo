import { NavLink } from "@remix-run/react";
import { type RemixNavLinkProps } from "@remix-run/react/dist/components";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const NavButton = forwardRef<HTMLAnchorElement, RemixNavLinkProps>(
  ({ className, ...props }, ref) => (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <NavLink
      ref={ref}
      className={({ isActive }) =>
        twMerge(
          "focus-ring inline-block rounded-lg p-2 transition-all",
          isActive
            ? "bg-gray-100 text-blue-500 dark:bg-gray-800 dark:text-blue-400"
            : // Uses a darker shade of gray because the element is small.
              "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
        )
      }
      {...props}
    />
  ),
);

export default NavButton;
