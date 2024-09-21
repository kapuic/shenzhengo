import { useMemo, useState } from "react";

import TabSelect from "~/components/TabSelect";
import { createPathWithSiblings, getDistanceFromRoot } from "~/utilities/tree";

import { useAppLoaderData } from ".";

export interface RangeTabsProps extends React.ComponentPropsWithoutRef<"div"> {
  filterRange: string;
  setFilterRange: (range: string) => void;
}

export default function RangeTabs({
  filterRange,
  setFilterRange,
  ...props
}: RangeTabsProps) {
  const { ranges } = useAppLoaderData();

  /* eslint-disable hooks/sort */

  const filterDistance = useMemo(
    () => getDistanceFromRoot(ranges, filterRange),
    [ranges, filterRange],
  );

  const [lastDeepestRange, setLastDeepestRange] = useState(filterRange);
  const lastDeepestDistance = useMemo(
    () => getDistanceFromRoot(ranges, lastDeepestRange),
    [ranges, lastDeepestRange],
  );
  useMemo(() => {
    if (filterDistance >= lastDeepestDistance) setLastDeepestRange(filterRange);
  }, [filterDistance, lastDeepestDistance, filterRange]);

  const rangesPath = useMemo(
    () =>
      createPathWithSiblings(
        ranges.map(({ name, ...other }) => ({ label: name, ...other })),
        lastDeepestRange,
        true,
      ),
    [ranges, lastDeepestRange],
  );

  /* eslint-enable hooks/sort */

  return (
    <TabSelect
      active={filterRange}
      setActive={setFilterRange}
      tabs={rangesPath}
      {...props}
    />
  );
}
