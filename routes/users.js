const { getAllUsers } = require("../database/adapters/users");

const usersRouter = require("express").Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
