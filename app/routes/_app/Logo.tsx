import logo from "~/../public/logos/logo.png";

export default function Logo() {
  return (
    <div className="flex h-full flex-row items-center">
      <img alt="MeishaGo Logo" className="mr-2 h-full" src={logo} />
      <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Meisha
        <span className="text-blue-500 dark:text-blue-400">Go</span>
      </span>
    </div>
  );
}
