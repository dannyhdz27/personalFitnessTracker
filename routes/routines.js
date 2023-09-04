const routinesRouter = require("express").Router();
const {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  getRoutinesByUser,
  updateRoutine,
  destroyRoutine,
} = require("../database/adapters/routines");
const { authRequired } = require("./auth");
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
routinesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { name, notes } = req.body;
    const creator_id = req.user.id;
    console.log("the req body is:", req.body);
    console.log("the req user id is:", creator_id);

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
routinesRouter.patch("/:routineId", authRequired, async (req, res, next) => {
  const { routineId } = req.params;
  const { name, notes } = req.body;
  try {
    const routine = await getRoutineById(routineId);

    if (!routine) {
      res.status(404).send("Routine not found");
      return;
    }

    if (req.user.id === routine.creator_id) {
      const updatedRoutine = await updateRoutine(routineId, name, notes);
      res.send(updatedRoutine);
      console.log("updatedRoutine", updatedRoutine);
    } else {
      res.status(403).send("You are not authorized to update this routine");
    }
  } catch (error) {
    console.error("There was an issue updating the routine by ID:", error);
    next(error);
  }
});

routinesRouter.delete("/:routineId", authRequired, async (req, res, next) => {
  const { routineId } = req.params;
  try {
    const routine = await getRoutineById(routineId);

    if (req.user.id === routine.creator_id) {
      await destroyRoutine(routineId);
      res.status(204).send();
    } else {
      res.status(403).send("You are not authorized to delete this routine");
    }
  } catch (error) {
    console.error("There was an issue deleting the routine by ID:", error);
    next(error);
  }
});

// DELETE /routines/:routineId ** only logged in user who created this routine can delete it.
module.exports = routinesRouter;
