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
  }
}
//getRoutineById(id) - This should use a join to grab the routine that matches the id and should all include all of the matching activities

//getAllRoutines()

//getAllRoutinesByUser(username)

//getPublicRoutinesByActivity(activityId) - elect and return an array of public routines which have a specific activity_id in their routine_activities join, include their activities (use a join)

//createRoutine(creatorId, name, description)

//updateRoutine(creatorId, name, description)

//destroyRoutine(routineId)

module.exports = { createRoutine };
