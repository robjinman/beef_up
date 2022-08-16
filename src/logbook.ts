import { getArrayProperty, getNumberProperty, getProperty, getStringEnumProperty } from "./json_utils";
import { differenceInCalendarDays, fromMap } from "./utils";

export enum MuscleGroup {
  Biceps,
  Triceps,
  Pectorals
}

export class ExerciseDefinition {
  constructor(
    private _name: string,
    private _primaryMovers: MuscleGroup[],
    private _assistingMuscles: MuscleGroup[]) {}

  get name() {
    return this._name;
  }
}

export type ExerciseDefinitionSet = ExerciseDefinition[];

export interface LogbookItem {
  fromJson(json: JSON): void;
  toJson(): any;
}

export class ExerciseSet implements LogbookItem {
  constructor(
    private _exercise: ExerciseDefinition,
    private _weight: number,
    private _reps: number) {}

  fromJson(json: JSON): void {

  }

  toJson(): any {

  }

  get weight() {
    return this._weight;
  }

  get reps() {
    return this._reps;
  }

  get exercise() {
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

  type: RestType;
  duration: number;
}

export class LogbookEntry {
  constructor(private _date: Date) {}

  addItem(item: LogbookItem): void {}

  fromJson(json: JSON): void {

  }

  toJson(): any {

  }
}

class RepRange {
  constructor(
    public min: number,
    public max: number) {}
}

enum OverloadType {
  Reps,
  Weight
}

class WorkoutExercise {
  constructor(
    public definition: ExerciseDefinition,
    public previousWeight: number,
    public reps: number,
    public sets: number,
    public overloadType: OverloadType) {}
}

export class WorkoutPlan {
  print() {
    for (const exercise of this._exercises) {
      const weight = exercise.previousWeight;
      const reps = exercise.reps;
      const sets = 3;
      console.log(`${exercise.definition.name} (${weight}kg / ${reps} reps / ${sets} sets)`);
    }
  }

  addExercise(exercise: ExerciseDefinition, weight: number, reps: number, sets: number,
    overloadType: OverloadType) {

    this._exercises.push(new WorkoutExercise(exercise, weight, reps, sets, overloadType));
  }

  private _exercises: WorkoutExercise[] = [];
}

class ExerciseStats {
  constructor(public exercise: ExerciseDefinition) {}

  lastPerformed: Date|null = null;
  currentConsecutiveFailures: number = 0;
  currentWeight: number = 0;
  currentReps: number = 0;
}

export class Logbook {
  constructor(json: object) {
    this._extractEntries(json);
    this._generateStats();
  }

  addEntry(entry: LogbookEntry) {}

  generatePlan(availableExercises: ExerciseDefinitionSet): WorkoutPlan {
    const plan = new WorkoutPlan;

    // TODO: Get these numbers from somewhere
    const NumRecoveryDays = 3;
    const TargetVolume = 25;
    const repRange = new RepRange(8, 12);
    const numSets = 3;

    let volume = 0;
    for (const exercise of availableExercises) {
      const stats = fromMap(this._statsByExercise, exercise);
      const now = new Date();
      const ready = stats.lastPerformed === null ||
        differenceInCalendarDays(now, stats.lastPerformed) > NumRecoveryDays;

      if (ready) {
        if (stats.currentReps >= repRange.max) {
          plan.addExercise(exercise, stats.currentWeight, repRange.min, numSets,
            OverloadType.Weight);
        }
        else {
          plan.addExercise(exercise, stats.currentWeight, stats.currentReps, numSets,
            OverloadType.Reps);
        }
      }

      volume += numSets;
      if (volume >= TargetVolume) {
        break;
      }
    }

    return plan;
  }

  private _extractEntries(obj: object) {
    const entries = getArrayProperty<object>(obj, "entries", "object");
  }

  private _generateStats() {

  }

  private _entries: LogbookEntry[] = [];
  private _stats: ExerciseStats[] = [];
  private _statsByExercise = new Map<ExerciseDefinition, ExerciseStats>();
}
