export function fromMap<K, V>(map: Map<K, V>, key: K): V {
  const value = map.get(key);
  if (value === undefined) {
    throw new Error(`Map does not contain key '${key}'`);
  }
  return value;
}

export function differenceInCalendarDays(a: Date, b: Date): number {
  const aTime = a.getTime();
  const aDay = aTime / (1000 * 60 * 60 * 24);

  const bTime = b.getTime();
  const bDay = bTime / (1000 * 60 * 60 * 24);

  return Math.floor(bDay) - Math.floor(aDay);
}
