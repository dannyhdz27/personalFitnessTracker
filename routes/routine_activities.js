const routineActivitiesRouter = require("express").Router();
const { authRequired } = require("./auth");

const {
  getRoutineActivityById,
  addActivityToRoutine_Activity,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../database/adapters/routine_activities");

const { getRoutineById } = require("../database/adapters/routines");

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
      console.error(
        "there was an error updating routine activity by id in route"
      );
      next(error);
    }
  }
);

//DELETE /routine_activities/:routineActivityId ** need authorization from logged in user
routineActivitiesRouter.delete(
  "/:routineActivityId",
  authRequired,
  async (req, res, next) => {
    // get the routineById and make sure the req.user.id is the routine's crator_id
    try {
      const routineActivityId = req.params.routineActivityId;
      const routineActivity = await getRoutineActivityById(routineActivityId);

      if (!routineActivity) {
        // Handle the case where the routine activity doesn't exist
        res.status(404).json({ message: "Routine activity not found" });
        return;
      }

      if (req.user.id === routineActivity.creator_id) {
        const destroyedActivityRoutine = await destroyRoutineActivity(
          routineActivityId
        );
        console.log("destroyedActivityRoutine:", destroyedActivityRoutine);
        res.json({ message: "Routine activity destroyed" });
      } else {
        res.status(403).json({
          message: "You are not authorized to delete this routine activity",
        });
      }
    } catch (error) {
      console.error(
        "there was an error deleting routine activity from routine in route"
      );
      next(error);
    }
  }
);

module.exports = routineActivitiesRouter;
