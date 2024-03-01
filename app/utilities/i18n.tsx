export function arrayToSentence(
  array: string[] | string,
  separator = ", ",
  conjunctionTwo = " and ",
  conjunctionMany = ", and ",
) {
  if (typeof array === "string") return array;
  if (array.length === 0) return "";
  if (array.length === 1) return array[0];
  if (array.length === 2) return `${array[0]}${conjunctionTwo}${array[1]}`;
  return `${array.slice(0, -1).join(separator)}${conjunctionMany}${array.slice(-1)}`;
}
