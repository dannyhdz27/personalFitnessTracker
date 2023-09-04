const { client } = require("../client");

async function createRoutine({ creator_id, name, notes }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines(creator_id, name, notes)
        VALUES($1,$2,$3)
        ON CONFLICT (name) DO NOTHING 
        RETURNING *;
        `,
      [creator_id, name, notes]
    );
    return routine;
  } catch (error) {
    console.error("there was an issue creating routine in adapter");
    throw error;
  }
}
//getRoutineById(id) - This should use a join to grab the routine that matches the id and should all include all of the matching activities
async function getRoutineById(id) {
  const {
    rows: [routine],
  } = await client.query(
    `
    SELECT 
    routines.id as id,
    routines.creator_id as creator_id,
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
    FULL OUTER JOIN routine_activities ON routines.id = routine_activities.routine_id
    FULL OUTER JOIN activities ON activities.id = routine_activities.activity_id
    GROUP BY routines.id, routine_activities.routine_id

  `);
    return rows;
  } catch (error) {
    console.error("there was an error getting all routines");
    throw error;
  }
}

//getAllRoutinesByUser(username)
async function getRoutinesByUser(username) {
  try {
    const { rows } = client.query(
      `
      SELECT 
      routines.id as id,
      routines.name as name,
      CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
      ELSE 
      JSON_AGG(
        JSon_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'reps', routine_activities.reps,
          'sets', routine_activities.sets,
          'weight', routine_activities.weight
          )
        ) END AS activities
        FROM routines
        JOIN users ON routines.creator_id = users.id
        FULL OUTER JOIN routine_activities ON routines.id = routine_activities.routine_id
        FULL OUTER JOIN activities  ON activities.id = routine_activities.activity_id
        WHERE users.username = $1 
        GROUP BY routines.id, routine_activities.routine_id
     
    `,
      [username]
    );
    return rows;
  } catch (error) {
    console.error("there was a error getting routine by user");
    throw error;
  }
}

//getPublicRoutinesByActivity(activityId) - select and return an array of public routines which have a specific activity_id in their routine_activities join, include their activities (use a join) - maybe i won't need this? idk

async function updateRoutine(routineId, name, notes) {
  try {
    const {
      rows: [updatedRoutine],
    } = await client.query(
      `UPDATE routines
      SET  name = $2, notes = $3
      WHERE  id = $1
      RETURNING *
    `,
      [routineId, name, notes]
    );
    return updatedRoutine;
  } catch (error) {
    console.error("there was an error updating routine in adapter");
    throw error;
  }
}

//destroyRoutine(routineId)
async function destroyRoutine(routineId) {
  await client.query(
    `DELETE from routines
    WHERE id = $1
          `,
    [routineId]
  );
  return;
}

module.exports = {
  createRoutine,
  getRoutineById,
  getAllRoutines,
  getRoutinesByUser,
  updateRoutine,
  destroyRoutine,
};
