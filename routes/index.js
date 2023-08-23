const router = require("express").Router();

router.get("/health", (req, res, next) => {
  try {
    res.send({
      message: "API is up and running",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
