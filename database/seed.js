const { client } = require("./client");

const { createUser } = require("./adapters/users");

const { users } = require("./seedData");

async function dropTables() {
  try {
    console.log("starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS routines CASCADE;
    DROP TABLE IF EXISTS routine_activities CASCADE;
    DROP TABLE IF EXISTS activities CASCADE;
    `);
    console.log("...finished dropping tables");
  } catch (error) {
    console.log(error);
  }
}

async function createTables() {
  try {
    console.log("Starting to create tables...");

    //users
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
        );`);
    console.log("...users table created");

    //routines
    await client.query(`CREATE TABLE routines (
    id SERIAL PRIMARY KEY,
    creator_id INTEGER REFERENCES users(id),
    name VARCHAR(255)UNIQUE NOT NULL,
    notes TEXT NOT NUll
  );`);
    console.log("...routines tables created");

    //activities
    await client.query(`CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL
  );`);
    console.log("...activities table created");

    //routine_activities
    await client.query(`CREATE TABLE routine_activities (
        id SERIAL PRIMARY KEY,
        routine_id INTEGER REFERENCES routines(id),
        activity_id INTEGER REFERENCES activities (id),
        reps INTEGER,
        sets INTEGER,
        UNIQUE (routine_id, activity_id)
      );`);
    console.log("...routine_activities table created");
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  try {
    console.log("populating user table...");
    for (const user of users) {
      await createUser(user);
    }
    console.log("...users table populated");
  } catch (error) {
    console.log(error);
  }
}

async function buildDatabase() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
    // await testDB();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}
buildDatabase();
