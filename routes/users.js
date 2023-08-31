const {
  getAllUsers,
  getUserByUsername,
  createUser,
} = require("../database/adapters/users");
const { authRequired } = require("./auth");

require("dotenv").config();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const usersRouter = require("express").Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await getUserByUsername(username);
    console.log("existing user is", existingUser);
    if (existingUser) {
      next({ message: "that user already exists!", name: "auth error" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("hashed password:", hashedPassword);
    const newUser = await createUser({ username, password: hashedPassword });
    const token = jwt.sign(newUser, JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    delete newUser.password;
    res.send({
      success: true,
      message: "thank you for signing up!",
      data: newUser,
    });
  } catch (error) {
    console.error("there was an issue registering a new user");
    next(error);
  }
});

module.exports = usersRouter;
