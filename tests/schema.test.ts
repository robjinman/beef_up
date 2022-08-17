import {} from '../src/schema';

const logbookExample = {
  _type: "Logbook",
  entries: [
    {
      _type: "LogbookEntry",
      date: "2022-08-12T19:52:02.036Z",
      items: [{
        _type: "ExerciseSet",
        exercise: "BenchPress",
        weight: 47,
        reps: 12
      }, {
        _type: "Rest",
        type: "Timed",
        duration: 60
      }, {
        _type: "ExerciseSet",
        exercise: "BenchPress",
        weight: 47,
        reps: 12
      }, {
        _type: "Rest",
        type: "Timed",
        duration: 60
      }, {
        _type: "ExerciseSet",
        exercise: "BenchPress",
        weight: 47,
        reps: 11
      }, {
        _type: "Rest",
        type: "Untimed"
      }]
    }
  ]
};

describe('testing schema', () => {
  describe('getProperty', () => {
    test('Can retrieve number', () => {
      const json = {
        one: "one",
        two: 2
      };
  
      expect(getProperty(json, "two", "number")).toBe(2);
    });

    test('Raises exception when string retrieved as number', () => {
      const json = {
        one: "one",
        two: 2
      };
  
      expect(() => getProperty(json, "two", "string")).toThrow(ParseError);
    });
  });
});
