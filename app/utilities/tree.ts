/** An item that can be a child of another item. */
export interface ChildableItem {
  id: string;
  parentId?: string;
}

/** An item that can contain children. */
export type TreeItem<T> = T & {
  children: TreeItem<T>[];
};

/**
 * Create a depth tree (resulting in {@linkcode TreeItem}s that each has a
 * `children` property) from a flat tree of {@link ChildableItem childable}
 * `items` according to their `parentId`s.
 */
export function createTree<T extends ChildableItem>(
  items: T[],
  parentId?: string,
): TreeItem<T>[] {
  return items
    .filter((item) => item.parentId === parentId)
    .map((item) => ({
      ...item,
      children: createTree(items, item.id),
    }));
}

/**
 * Get the distance of an item identified by `id` from the root of a flat tree
 * of {@link ChildableItem childable} `items`.
 */
export function getDistanceFromRoot<T extends ChildableItem>(
  items: T[],
  id: string,
): number {
  const item = items.find((item) => item.id === id);
  if (!item?.parentId) return 0;
  return 1 + getDistanceFromRoot(items, item.parentId);
}

/** A level of a tree with a center item and its siblings. */
export type CenteredTreeLevel<T> = { center: T; siblings: T[] };

/**
 * Create a path of {@linkcode CenteredTreeLevel}s from the root to an item
 * identified by `id` in a flat tree of {@link ChildableItem childable} `items`.
 */
export function createPathWithSiblings<T extends ChildableItem>(
  items: T[],
  id: string,
  includeDefaultChildLevels: number | boolean = false,
  includeCenterInSiblings = false,
): CenteredTreeLevel<T>[] {
  const item = items.find((item) => item.id === id);
  if (!item) return [];
  const siblings = items.filter(
    (i) =>
      i.parentId === item.parentId && (includeCenterInSiblings || i.id !== id),
  );
  const result = [
    ...(item.parentId ? createPathWithSiblings(items, item.parentId) : []),
    { center: item, siblings },
  ];
  if (!includeDefaultChildLevels) return result;
  let defaultChild = item;
  while (
    includeDefaultChildLevels === true ||
    includeDefaultChildLevels-- > 0
  ) {
    // eslint-disable-next-line no-loop-func
    const children = items.filter((i) => i.parentId === defaultChild.id);
    if (children.length === 0) break;
    defaultChild = children[0];
    result.push({ center: defaultChild, siblings: children.slice(1) });
  }
  return result;
}
