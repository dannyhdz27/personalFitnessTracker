const activitiesRouter = require("express").Router();
const {
  getAllActivities,
  createActivity,
} = require("../database/adapters/activities");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    console.error("there was an error getting all activities");
    next(error);
  }
});

// POST /activities *need to be logged in
activitiesRouter.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const postActivity = await createActivity({ name, description });
    res.send(postActivity);
  } catch (error) {
    console.error("there was an error creating a new activity");
    next(error);
  }
});

// PATCH /activities/:adcitivtyId *need to be logged in

// GET /activities/:activityId:routines  - get a list of all public routines that have the activity.

module.exports = activitiesRouter;
