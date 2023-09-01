const { client } = require("../client");

//here we're creating a new routine_activity. this connects the routine to the activity. if there's no routine, then you can't create a ra. consider error handling?
async function addActivityToRoutine_Activity(
  routine_id,
  activity_id,
  reps,
  sets,
  weight
) {
  try {
    const {
      rows: [routine_activities],
    } = await client.query(
      `
        INSERT INTO routine_activities(routine_id, activity_id, reps, sets, weight)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      [routine_id, activity_id, reps, sets, weight]
    );
    return routine_activities;
  } catch (error) {
    console.error("error inserting activity to routine_activity");
  }
}

//getRoutineActivityById(routineActivityId)
async function getRoutineActivityById(routineActivityId) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
      SELECT * FROM routine_activities
      WHERE id = $1
    `,
      [routineActivityId]
    );
    return routineActivity;
  } catch (error) {
    console.error(
      "there was an issue getting routine activity by id in adapter"
    );
    throw error;
  }
}

// updateRoutineActivity(routineActivityId, reps, sets) - Find the routine_activity with id equal to the passed in routineActivityId
async function updateRoutineActivity(routineActivityId, reps, sets, weight) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `   UPDATE routine_activities 
      SET reps = $1, sets = $2, weight = $3
      FROM routines
      WHERE routine_activities.id = $4
      AND routine_activities.routine_id = routines.id
      
        `,
      [reps, sets, weight, routineActivityId]
    );
    return routineActivity;
  } catch (error) {
    console.error("there was an issue updating routine activity in adapter");
    throw error;
  }
}

//destroyRoutineActivity(routineActivityId) - this removes the activity as well by severing the reference
async function destroyRoutineActivity(routineActivityId) {
  await client.query(
    `
    DELETE FROM routine_activities
    WHERE routine_activities.id = $1 
    RETURNING *
  ;
        `,
    [routineActivityId]
  );
  return;
}

//getRoutineActivitiesByRoutine(routineId)

async function getRoutineActivityByRoutine(routineId) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT * FROM routine_activities
        WHERE routine_id = $1
      `,
      [routineId]
    );
    return routine;
  } catch (error) {
    console.error(
      "there was an error getting routine_activity by routine in adapter"
    );
    throw error;
  }
}

module.exports = {
  addActivityToRoutine_Activity,
  getRoutineActivityById,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivityByRoutine,
};
