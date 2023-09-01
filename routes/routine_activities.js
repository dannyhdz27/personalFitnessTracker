const routineActivitiesRouter = require("express").Router();
const { authRequired } = require("./auth");

const {
  getRoutineActivityById,
  addActivityToRoutine_Activity,
  updateRoutineActivity,
} = require("../database/adapters/routine_activities");

routineActivitiesRouter.get("/:id", async (req, res, next) => {
  try {
    const routineActivity = await getRoutineActivityById(req.params.id);
    res.send(routineActivity);
  } catch (error) {
    next(error);
  }
});

routineActivitiesRouter.post("/", async (req, res, next) => {
  try {
    const { routine_id, activity_id, reps, sets, weight } = req.body;
    const newRoutineActivity = await addActivityToRoutine_Activity(
      routine_id,
      activity_id,
      reps,
      sets,
      weight
    );
    res.send(newRoutineActivity);
  } catch (error) {
    console.error(
      "there was an error adding activity to routine_activity in route"
    );
    next(error);
  }
});

//PATCH /routine_activities/:routineActivityId  ** need authorization from logged in user
routineActivitiesRouter.patch(
  "/:routineActivityId",
  authRequired,
  async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
      const { reps, sets, weight } = req.body;
      const updatedRoutineActivity = await updateRoutineActivity(
        routineActivityId,
        reps,
        sets,
        weight
      );
      res.send(updatedRoutineActivity);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE /routine_activities/:routineActivityId ** need authorization from logged in user

module.exports = routineActivitiesRouter;
