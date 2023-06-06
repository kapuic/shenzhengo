import { useDropdownContext } from ".";

export default function DropdownButton({
  children,
  ...props
}: JSX.IntrinsicElements["div"]) {
  const context = useDropdownContext();

  return (
    <div id={context.meunId} role="button" tabIndex={0} {...props}>
      {children}
    </div>
  );
}
