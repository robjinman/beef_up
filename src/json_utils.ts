export class ParseError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export function getProperty(obj: object, key: string, type: string): any {
  if (!(key in obj)) {
    throw new ParseError(`No key named ${key} in object`);
  }
  const value: any = obj[<keyof typeof obj>key];
  const actualType = typeof(value);

  if (actualType !== type) {
    throw new ParseError(`'${key}' property is type ${actualType}, expected ${type}`);
  }

  return value;
}

export function getNumberProperty(obj: object, key: string): number {
  return getProperty(obj, key, "number");
}

export function getStringProperty(obj: object, key: string): string {
  return getProperty(obj, key, "string");
}

export function getArrayProperty<T>(obj: object, key: string, elementType: string): T[] {
  const value = getProperty(obj, key, "object");
  if (!Array.isArray(value)) {
    throw new ParseError(`${key} property is not an array, expected array of ${elementType}s`);
  }
  const arr = <Array<any>>(value);
  if (arr.length > 0 && typeof(arr[0]) !== elementType) {
    throw new ParseError(`First element of ${key} property is ${typeof(arr[0])}, `
                       + `expected array of ${elementType}s`);
  }
  return value;
}

export function getStringEnumProperty(obj: object, key: string, enumType: Object): string {
  const value = getProperty(obj, key, "string");
  if (!enumType.hasOwnProperty(value)) {
    throw new ParseError(`Unrecognised enum value: ${value}`);
  }
  return value;
}
