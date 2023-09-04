//this is where we set up our server using express.
const express = require("express");
const server = express();
const port = 3000;

const path = require("path");

const { client } = require("./database/client"); //need connection to database here too
client.connect();

//middleware
server.use(express.json()); //parse incoming JSON payloads in the request body. so you can handle data sent to your server as JSON. Also note: typically placed early in the middleware chain, as it needs to parse the request body before other middleware or route handlers access the data.
const morgan = require("morgan"); //automatically generates logs for each incoming request and corresponding response. Extremely helpful for monitoring and debugging.
server.use(morgan("dev"));

const cookieParser = require("cookie-parser");

app.use(express.static(path.join(__dirname, "./client", "dist"))); //This piece of middleware uses the built in path module from node, so we dont need to npm install it, but we do need to require it at the top of our express app

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

//When you go to any other route not specified in the express part of your app, you will hit your finished react application.
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
