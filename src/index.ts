import "reflect-metadata"
import { AppDataSource } from "./data_source"
import { User } from "./entity/user"
import { Logbook, ExerciseDefinition, MuscleGroup, LogbookEntry, ExerciseSet, Rest } from "./logbook";

async function main() {
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

  const logbookJson = {
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
  };

  const logbook = new Logbook(logbookJson);

  const entry = new LogbookEntry(new Date());

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

  //const plan = logbook.generatePlan(home);
  //plan.print();

  console.log("Inserting a new user into the database...")
  const user = new User()
  user.firstName = "Timber"
  user.lastName = "Saw"
  user.age = 25
  await AppDataSource.manager.save(user)
  console.log("Saved a new user with id: " + user.id)

  console.log("Loading users from the database...")
  const users = await AppDataSource.manager.find(User)
  console.log("Loaded users: ", users)

  console.log("Here you can setup and run express / fastify / any other framework.")
}

AppDataSource.initialize().then(main).catch(error => console.log(error))
