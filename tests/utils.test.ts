import { differenceInCalendarDays } from '../src/utils';
 
describe('testing utils', () => {
  describe('differenceInCalenderDays', () => {
    test('Correctly calculates difference for identical dates', () => {
      const a = new Date("2022-08-15T19:52:02.036Z");
      const b = new Date("2022-08-15T19:52:02.036Z");
      expect(differenceInCalendarDays(a, b)).toBe(0);
    });

    test('Correctly calculates difference for same day, different times', () => {
      const a = new Date("2022-08-15T00:00:00.000Z");
      const b = new Date("2022-08-15T23:59:59.999Z");
      expect(differenceInCalendarDays(a, b)).toBe(0);
    });

    test('Correctly calculates difference for dates just either side of midnight', () => {
      const a = new Date("2022-08-15T23:59:59.999Z");
      const b = new Date("2022-08-16T00:00:00.000Z");
      expect(differenceInCalendarDays(a, b)).toBe(1);
    });
  });
});
