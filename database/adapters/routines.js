const { client } = require("../client");

async function createRoutine({ creator_id, name, notes }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines("creator_id", name, notes)
        VALUES($1,$2,$3)
        ON CONFLICT (name) DO NOTHING 
        RETURNING *;
        `,
      [creator_id, name, notes]
    );
    return routine;
  } catch (error) {
    console.error("there was an issue creating routine");
    throw error;
  }
}
//getRoutineById(id) - This should use a join to grab the routine that matches the id and should all include all of the matching activities
async function getRoutineById(id) {
  console.log("hello");
  const {
    rows: [routine],
  } = await client.query(
    `
    SELECT 
    routines.id as id,
    routines.name as name,
    routines.notes as notes,
    CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
    ELSE
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'reps', routine_activities.reps,
        'sets', routine_activities.sets,
        'weight', routine_activities.weight
      )
    ) END AS activities
    FROM routines
    FULL OUTER JOIN routine_activities 
    ON routines.id = routine_activities.routine_id
    FULL OUTER JOIN activities
    ON activities.id = routine_activities.activity_id
    WHERE routines.id = $1
    GROUP BY routines.id, routine_activities.routine_id
  `,
    [id]
  );

  return routine;
}

//getAllRoutines()
async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
  SELECT
  routines.id AS routine_id,
  routines.name AS routine_name,
  routines.notes AS routine_notes,
  activities.id AS activity_id,
  activities.name AS activity_name,
  activities.description AS activity_description,
  routine_activities.reps,
  routine_activities.sets,
  routine_activities.weight
FROM routines
LEFT JOIN routine_activities ON routines.id = routine_activities.routine_id
LEFT JOIN activities ON routine_activities.activity_id = activities.id;

  `);
    return rows;
  } catch (error) {
    console.error("there was an error getting all routines");
    throw error;
  }
}

//getAllRoutinesByUser(username)

//getPublicRoutinesByActivity(activityId) - elect and return an array of public routines which have a specific activity_id in their routine_activities join, include their activities (use a join)

//createRoutine(creatorId, name, description)

//updateRoutine(creatorId, name, description)

//destroyRoutine(routineId)

module.exports = { createRoutine, getRoutineById, getAllRoutines };
