export function fromMap<K, V>(map: Map<K, V>, key: K): V {
  const value = map.get(key);
  if (value === undefined) {
    throw new Error(`Map does not contain key '${key}'`);
  }
  return value;
}

export class DateDiff {
  calendarYears = 0;
  years = 0;
  calendarMonths = 0;
  months = 0;
  calendarDays = 0;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
}

export function dateDifference(a: Date, b: Date): DateDiff {
  const diff = new DateDiff;

  // TODO

  return diff;
}