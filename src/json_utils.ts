export class ParseError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export function getProperty(obj: any, key: string, type: string): any {
  if (!(key in obj)) {
    throw new ParseError(`No key named ${key} in object`);
  }
  const value: any = obj[key];
  const actualType = typeof(value);

  if (actualType !== type) {
    throw new ParseError(`Key is type ${actualType}, expected ${type}`);
  }

  return value;
}

export function getNumberProperty(obj: any, key: string): number {
  return getProperty(obj, key, "number");
}

export function getStringEnumProperty(obj: any, key: string, enumType: Object): string {
  const value = getProperty(obj, key, "string");
  if (!enumType.hasOwnProperty(value)) {
    throw new ParseError(`Unrecognised enum value: ${value}`);
  }
  return value;
}
