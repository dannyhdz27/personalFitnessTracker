const { client } = require("../client");

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          INSERT INTO users(username, password)
          VALUES($1,$2)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
          `,
      [username, password]
    );
    return user;
  } catch (error) {
    console.error("there was an issue creating user");
  }
}

//getUser(username, password) - this should be able to verify the password against the hashed password

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM users;
  `);
    return rows;
  } catch (error) {
    console.error("there was an issue getting all users");
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT username
      FROM users
      WHERE id=${id}
    `,
      [id]
    );

    if (!user) {
      return "user does not exist";
    }

    return user;
  } catch (error) {
    console.error("there was an issue getting the user by ID");
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * 
        FROM users
        WHERE username= $1
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.error("there was an issue getting the user by username");
  }
}

module.exports = { createUser, getAllUsers, getUserById, getUserByUsername };
