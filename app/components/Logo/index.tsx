import { twMerge } from "tailwind-merge";

import logo from "./logo.png";

export interface LogoProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <div
      className={twMerge("flex h-full flex-row items-center", className)}
      {...props}
    >
      <img alt="MeishaGo Logo" className="mr-2 h-full" src={logo} />
      <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Meisha
        <span className="text-blue-500 dark:text-blue-400">Go</span>
      </span>
    </div>
  );
}
