export class ValidationError extends Error {
  constructor(path: string[], msg: string) {
    super(`Validation error ${path}: ${msg}`);
  }
}

export type SchemaProperty = {
  types: string[];
  optional: boolean;
};

export type SchemaObject = { [key: string] : SchemaProperty|SchemaProperty[] };
export type Schema = { [ key: string ]: SchemaObject };

export function X(types: string[]|string, optional: boolean = false): SchemaProperty {
  return {
    types: Array.isArray(types) ? types : [types],
    optional
  };
}

function getType(path: string[], obj: any): string {
  if (!("_type" in obj)) {
    throw new ValidationError(path, "No _type property on object");
  }
  return obj._type;
}

export function validateArrayProperty(path: string[], arr: any[], propSchema: SchemaProperty, schema: Schema) {
  for (const elem of arr) {
    validateProperty(path, elem, propSchema, schema);
  }
}

export function validateProperty(path: string[], prop: any, propSchema: SchemaProperty, schema: Schema) {
  if (typeof(prop) in propSchema.types) {
    return;
  }
  if (typeof(prop) !== "object") {
    throw new ValidationError(path, `Failed to match property against permissable types ${propSchema.types}`);
  }
  const typeName = getType(path, prop);
  for (const permissableType of propSchema.types) {
    if (!(permissableType in schema)) {
      throw new ValidationError(path, `Type '${permissableType}' not in schema`);
    }
    if (typeName === permissableType) {
      validateObject(path, prop, schema[permissableType], schema);
      return;
    }
  }
  throw new ValidationError(path, `Failed to match property against permissable types ${propSchema.types}`);
}

export function validateObject(path: string[], obj: object, objectSchema: SchemaObject, schema: Schema) {
  const typeName = getType(path, obj);
  for (const [k, v] of Object.entries(obj)) {
    if (!(k in objectSchema)) {
      throw new ValidationError(path, `Unexpected property '${k}' in object of type ${typeName}`);
    }
    const propSchema = objectSchema[k];
    if (Array.isArray(propSchema)) {
      if (propSchema.length != 1) {
        throw new ValidationError(path, `Invalid schema: Property ${k} should be array with 1 element`);
      }
      validateArrayProperty([...path, k], v, propSchema[0], schema);
    }
    else {
      validateProperty([...path, k], v, propSchema, schema);
    }
  }
}

export function validateRootObject(obj: object, schema: Schema) {
  const objectType = getType([], obj);
  const objectSchema = schema[objectType];
  validateObject([], obj, objectSchema, schema);
}

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