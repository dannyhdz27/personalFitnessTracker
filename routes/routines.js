const routinesRouter = require("express").Router();
const {
  getAllRoutines,
  getRoutineById,
} = require("../database/adapters/routines");
// GET /routines
routinesRouter.get("/", async (req, res, next) => {
  try {
    const routine = await getAllRoutines();
    res.send(routine);
  } catch (error) {
    console.error("there was an error getting routine in route");
    next(error);
  }
});

routinesRouter.get("/:id", async (req, res, next) => {
  try {
    const routineId = await getRoutineById(req.params.id);
    res.send(routineId);
    console.log(routineId);
  } catch (error) {
    console.error("there was an error getting routine by ID in route");
    next(error);
  }
});
// POST /routines *need to be logged in

// PATCH /routines/:routineId **only logged in user who created this routine can update it.

// DELETE /routines/:routineId ** only logged in user who created this routine can delete it.
module.exports = routinesRouter;
