const users = [
  { username: "Daniel", password: 12345678 },
  { username: "userTest", password: 12345678 },
  { username: "randoMan", password: 12345678 },
  { username: "DarneLL", password: 12345678 },
];

const activities = [
  { name: "squats", description: "LEGS" },
  { name: "lunges", description: "LEGS" },
  { name: "deadlifts", description: "LEGS" },
  { name: "calf raises", description: "LEGS" },
  { name: "split squats", description: "LEGS" },
  { name: "bicep curl", description: "ARMS" },
  { name: "tricep extension", description: "ARMS" },
  { name: "shoulder press", description: "SHOULDERS" },
  { name: "lateral raises", description: "SHOULDERS" },
  { name: "front raises", description: "SHOULDERS" },
  { name: "hammercurls", description: "ARMS" },
  { name: "skullcrushers", description: "ARMS" },
  { name: "lat pull down", description: "BACK" },
  { name: "rows", description: "BACK" },
  { name: "bench press", description: "CHEST" },
  { name: "incline bench press", description: "CHEST" },
  { name: "machine press", description: "CHEST" },
  { name: "cable crossover", description: "CHEST" },
  { name: "push ups", description: "CHEST" },
  { name: "walking", description: "CARDIO" },
];
const routines = [
  {
    creator_id: 1,
    name: "chest",
    notes: "incorporate some back and calf work",
  },
  {
    creator_id: 1,
    name: "legs",
    notes: "deadlift when possible",
  },
  {
    creator_id: 1,
    name: "back",
    notes: "incorporate biceps",
  },
  {
    creator_id: 1,
    name: "shoulders",
    notes: "incorporate abs and cardio",
  },
];

const routine_activities = [
  //chest
  {
    routine_id: 1,
    activity_id: 15,
    reps: 10,
    sets: 4,
  },
  {
    routine_id: 1,
    activity_id: 16,
    reps: 10,
    sets: 4,
  },
  {
    routine_id: 1,
    activity_id: 17,
    reps: 10,
    sets: 4,
  },
  {
    routine_id: 1,
    activity_id: 18,
    reps: 10,
    sets: 4,
  },
];
module.exports = { users, activities, routines, routine_activities };
