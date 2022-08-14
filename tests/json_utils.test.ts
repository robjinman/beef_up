import { getProperty, getStringEnumProperty, ParseError } from '../src/json_utils';
 
describe('testing json utils', () => {
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
  
      expect(() => getProperty(json, "two", "string"))
        .toThrow(new ParseError("Key is type number, expected string"));
    });
  });

  describe("getStringEnumProperty", () => {
    enum ExampleStringEnum {
      Apple = "Apple",
      Banana = "Banana",
      Orange = "Orange"
    }

    test('Can retrieve enum value', () => {
      const json = {
        one: "one",
        two: "Banana"
      };
  
      expect(getStringEnumProperty(json, "two", ExampleStringEnum)).toBe(ExampleStringEnum.Banana);
    });

    test('Raises exception on retrieving unrecognised enum value', () => {
      const json = {
        one: "one",
        two: "Bananaa"
      };
  
      expect(() => getStringEnumProperty(json, "two", ExampleStringEnum))
        .toThrow(new ParseError(`Unrecognised enum value: ${json.two}`));
    });
  });
});
