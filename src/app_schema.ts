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
