const activitiesRouter = require("express").Router();
const { getAllActivities } = require("../database/adapters/activities");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    console.error("there was an error getting all activities");
    next(error);
  }
});

module.exports = activitiesRouter;
