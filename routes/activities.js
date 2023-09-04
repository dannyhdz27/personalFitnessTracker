const activitiesRouter = require("express").Router();
const {
  getAllActivities,
  createActivity,
  updateActivity,
} = require("../database/adapters/activities");

const { authRequired } = require("./auth");

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
activitiesRouter.patch("/:activityId", authRequired, async (req, res, next) => {
  try {
    const { activityId } = req.params;
    const { name, description } = req.body;
    const updatedActivity = await updateActivity(
      activityId,
      name,
      description,
      req.user.id
    );

    res.send(updatedActivity);
  } catch (error) {
    next({ message: "invalid user credentials" });
  }
});

// GET /activities/:activityId/:routines  - get a list of all routines that have the activity.

module.exports = activitiesRouter;
