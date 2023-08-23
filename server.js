//this is where we set up our server using express. Remember to npm install express when doing this. npm init will give us a package.json file
const express = require("express");
const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send("this is the response we get back");
});

server.use("/api", require("./routes"));

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
