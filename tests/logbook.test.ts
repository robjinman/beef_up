import { ExerciseDefinition, Logbook, MuscleGroup, Rest, RestType } from '../src/logbook';

const BenchPress = new ExerciseDefinition("Bench press",
  [MuscleGroup.Pectorals], [MuscleGroup.Triceps]);
const OverheadPress = new ExerciseDefinition("Overhead press",
  [], [MuscleGroup.Triceps]);
const InclinedBenchPress = new ExerciseDefinition("Inclined bench press",
  [MuscleGroup.Pectorals], [MuscleGroup.Triceps]);
const LegPress = new ExerciseDefinition("Leg press", [], []);

const HomeExerciseSet = [
  BenchPress,
  OverheadPress,
  InclinedBenchPress
];

const GymExerciseSet = [
  LegPress,
  BenchPress,
  InclinedBenchPress,
  OverheadPress
];

const workoutJson = {
  entries: [
    {
      date: "2022-08-12T19:52:02.036Z",
      items: [
        {
          type: "ExerciseSet",
          exercise: "BenchPress",
          weight: 47,
          reps: 12
        },
        {
          type: "ExerciseSet",
          exercise: "BenchPress",
          weight: 47,
          reps: 12
        },
        {
          type: "ExerciseSet",
          exercise: "BenchPress",
          weight: 47,
          reps: 11
        }
      ]
    }
  ]
}

describe('testing logbook', () => {
  describe('Rest class', () => {
    test('Rest instance populated from json', () => {
      const json = {
        type: "Rest",
        value: {
          type: "Timed",
          duration: 123
        }
      };

      const rest = new Rest;
      rest.fromJson(json.value);

      expect(rest.type).toBe(RestType.Timed);
      expect(rest.duration).toBe(123);
    });
  });

  describe("Logbook class", () => {
    test('Generates workout plan', () => {
      const logbook = new Logbook(workoutJson);
      const plan = logbook.generatePlan(GymExerciseSet);

      plan.print();
    });;
  });
});
