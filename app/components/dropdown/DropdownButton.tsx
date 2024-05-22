import { useDropdownContext } from ".";

export default function DropdownButton({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const context = useDropdownContext();

  return (
    <div id={context.menuId} role="button" tabIndex={0} {...props}>
      {children}
    </div>
  );
}
