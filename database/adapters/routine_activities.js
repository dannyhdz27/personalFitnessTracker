const { client } = require("../client");

async function addActivityToRoutine_Activity({
  routine_id,
  activity_id,
  reps,
  sets,
}) {
  try {
    const {
      rows: [routine_activities],
    } = await client.query(
      `
        INSERT INTO routine_activities(routine_id, activity_id, reps, sets)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
      [routine_id, activity_id, reps, sets]
    );
    return routine_activities;
  } catch (error) {
    console.error("error inserting activity to routine_activity");
  }
}

//getRoutineActivityById(routineActivityId)

// updateRoutineActivity(routineActivityId, reps, sets) - Find the routine_activity with id equal to the passed in routineActivityId

//destroyRoutineActivity(routineActivityId) - this removes the activity as well by severing the reference

//getRoutineActivitiesByRoutine(routineId)

module.exports = {
  addActivityToRoutine_Activity,
};
