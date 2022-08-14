import { Rest, RestType } from '../src/logbook';
 
describe('testing logbook', () => {
  test('Rest instance populated from json', () => {
    const json = {
      type: "Rest",
      value: {
        type: "Timed",
        duration: 123
      }
    };

    const rest = new Rest;
    rest.fromJson(json.value);

    expect(rest.type).toBe(RestType.Timed);
    expect(rest.duration).toBe(123);
  });
});
