const { client } = require("../client");

async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
              INSERT INTO activities(name, description)
              VALUES($1,$2)
              ON CONFLICT (name) DO NOTHING
              RETURNING *;
              `,
      [name, description]
    );
    return activity;
  } catch (error) {
    console.error("there was an issue creating the activities");
    throw error;
  }
}

//getActivityById(activityId)
async function getActivityById(activityId) {
  try {
    const {
      rows: [activity],
    } = await client.query(`
    SELECT * FROM activities
    WHERE id = ${activityId}`);
    return activity;
  } catch (error) {
    console.error("there was an error getting the activity by id");
    throw error;
  }
}

//getAllActivities()
async function getAllActivities() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM activities
    `);
    return rows;
  } catch (error) {
    console.error("there was an error getting all activities");
    throw error;
  }
}

//updateActivity(activityId, name, description) - we're not updating the activityId, just the name and description

async function updateActivity(activityId, name, description) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    UPDATE activities
    SET name = $1, description = $2
    WHERE id = $3
    RETURNING *
    `,
      [name, description, activityId]
    );
    return activity;
  } catch (error) {
    console.error(
      `there was an error updating the activity with id: ${activityId}`
    );
    throw error;
  }
}

module.exports = {
  createActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
};
