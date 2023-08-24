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

module.exports = { createRoutine };
