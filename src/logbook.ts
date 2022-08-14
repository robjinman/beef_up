import { getNumberProperty, getStringEnumProperty } from "./json_utils";

export enum MuscleGroup {
  Biceps,
  Triceps,
  Pectorals
}

export class ExerciseDefinition {
  constructor(name: string, primaryMovers: MuscleGroup[], assistingMuscles: MuscleGroup[]) {}
}

export type ExerciseDefinitionSet = ExerciseDefinition[];

export interface LogbookItem {
  fromJson(json: JSON): void;
  toJson(): any;
}

export class ExerciseSet implements LogbookItem {
  constructor(private _exercise: ExerciseDefinition,
    private _weight: number,
    private _reps: number) {}

  fromJson(json: JSON): void {

  }

  toJson(): any {

  }

  public get weight() {
    return this._weight;
  }

  public get reps() {
    return this._reps;
  }

  public get exercise() {
    return this._exercise;
  }
}

export enum RestType {
  Timed = "timed",
  Untimed = "untimed"
}

export class Rest implements LogbookItem {
  constructor(duration?: number) {
    if (duration !== undefined) {
      this.type = RestType.Timed;
      this.duration = duration;
    }
    else {
      this.type = RestType.Untimed;
      this.duration = 0;
    }
  }

  fromJson(obj: any): void {
    this.type = RestType[getStringEnumProperty(obj, "type", RestType) as keyof typeof RestType];
    this.duration = getNumberProperty(obj, "duration");
  }

  toJson(): any {
    return {
      type: this.type,
      duration: this.duration
    };
  }

  public type: RestType;
  public duration: number;
}

export class LogbookEntry {
  constructor(private _date: Date) {}

  addItem(item: LogbookItem): void {}

  fromJson(json: JSON): void {

  }

  toJson(): any {

  }
}

export class Logbook {
  addEntry(entry: LogbookEntry): void {}
}