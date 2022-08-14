import { Logbook, ExerciseDefinition, MuscleGroup, LogbookEntry, ExerciseSet, Rest } from "./logbook";

export function main(): void {
  const BenchPress = new ExerciseDefinition("Bench press",
    [MuscleGroup.Pectorals], [MuscleGroup.Triceps]);
  const OverheadPress = new ExerciseDefinition("Overhead press",
    [], [MuscleGroup.Triceps]);
  const InclinedBenchPress = new ExerciseDefinition("Inclined bench press",
    [MuscleGroup.Pectorals], [MuscleGroup.Triceps]);
  const LegPress = new ExerciseDefinition("Leg press", [], []);

  const home = [
    BenchPress,
    OverheadPress,
    InclinedBenchPress
  ];

  const gym = [
    LegPress,
    BenchPress,
    InclinedBenchPress,
    OverheadPress
  ];

  const logbookJson = {};

  const logbook = new Logbook(logbookJson);
  const entry = new LogbookEntry(new Date("2022/08/13"));

  entry.addItem(new ExerciseSet(OverheadPress, 32, 8));
  entry.addItem(new Rest(60));
  entry.addItem(new ExerciseSet(OverheadPress, 32, 8));
  entry.addItem(new Rest(60));
  entry.addItem(new ExerciseSet(OverheadPress, 32, 6));
  entry.addItem(new Rest());
  entry.addItem(new ExerciseSet(BenchPress, 47, 8));
  entry.addItem(new Rest(60));
  entry.addItem(new ExerciseSet(BenchPress, 47, 8));
  entry.addItem(new Rest(60));
  entry.addItem(new ExerciseSet(BenchPress, 47, 12));

  logbook.addEntry(entry);

  const plan = logbook.generatePlan(home);
  plan.print();
}

main();
