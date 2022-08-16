import { getArrayProperty, getProperty, getStringEnumProperty, ParseError } from '../src/json_utils';
 
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
  
      expect(() => getProperty(json, "two", "string")).toThrow(ParseError);
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
  
      expect(() => getStringEnumProperty(json, "two", ExampleStringEnum)).toThrow(ParseError);
    });
  });

  describe("getArrayProperty<T>", () => {
    test("Can retrieve an array of numbers", () => {
      const json = {
        arr: [100, 200, 300]
      };
      expect(getArrayProperty<object>(json, "arr", "number")).toBe(json.arr);
    });
  });
});
