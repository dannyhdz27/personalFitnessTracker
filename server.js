//this is where we set up our server using express. Remember to npm install express.
const express = require("express");
const server = express();
const port = 3000;

const { client } = require("./database/client"); //need connection to database here too
client.connect();

//middleware
server.use(express.json()); //parse incoming JSON payloads in the request body. so you can handle data sent to your server as JSON. Also note: typically placed early in the middleware chain, as it needs to parse the request body before other middleware or route handlers access the data.
const morgan = require("morgan"); //automatically generates logs for each incoming request and corresponding response. Extremely helpful for monitoring and debugging.
server.use(morgan("dev"));

const cookieParser = require("cookie-parser");

const cors = require("cors");
server.use(cors());

require("dotenv").config();
server.use(cookieParser(process.env.COOKIE_SECRET));

server.get("/", (req, res) => {
  res.send("This is the HOME page");
});

server.use("/api", require("./routes"));

// Error Handler
server.use((err, req, res, next) => {
  res.send({
    success: false,
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
