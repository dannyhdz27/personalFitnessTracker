const routinesRouter = require("express").Router();
const {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  getRoutinesByUser,
  updateRoutine,
  destroyRoutine,
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
routinesRouter.post("/", async (req, res, next) => {
  try {
    const { creator_id, name, notes } = req.body;
    const createdRoutine = await createRoutine({
      creator_id,
      name,
      notes,
    });
    res.send(createdRoutine);
  } catch (error) {
    console.error("there was an error posting routine in route");
    next(error);
  }
});

// PATCH /routines/:routineId **only logged in user who created this routine can update it.

// DELETE /routines/:routineId ** only logged in user who created this routine can delete it.
module.exports = routinesRouter;
