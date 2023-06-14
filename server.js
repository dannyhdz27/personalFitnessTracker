const express = require("express");
const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send("testing server");
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
