import { X, Schema } from "./schema"

const LogbookItem = {
  type: X("string")
};

export const AppSchema: Schema = {
  Logbook: {
    entries: [X("LogbookEntry")]
  },
  ExerciseSet: {
    ...LogbookItem,
    exercise: X("string"),
    weight: X("number"),
    reps: X("number")
  },
  Rest: {
    ...LogbookItem,
    type: X("string"),
    duration: X("number", true)
  },
  LogbookEntry: {
    date: X("string"),
    items: [X(["Rest", "ExerciseSet"])]
  }
};

export interface LogbookItemObject {
  type: string;
}

export interface LogbookEntryObject {
  date: string;
  items: (RestObject|ExerciseSetObject)[];
}

export interface LogbookObject {
  entries: LogbookEntryObject[];
}

export interface ExerciseSetObject extends LogbookItemObject {
  exercise: string;
  weight: number;
  reps: number;
}

export interface RestObject extends LogbookItemObject {
  duration?: number;
}
