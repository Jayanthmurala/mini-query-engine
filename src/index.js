const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./router");
const dotEnv = require("dotenv");

const app = express();
dotEnv.config();
const PORT = process.env.PORT || 3000;

// Set up middleware to process incoming data
app.use(bodyParser.json());

// Use our routes under /api
app.use("/api", routes);
app.use("/", (req, res) => {
  res.send(
    "Welcome to the Mini Query Engine API! Use /api/login to get a token."
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
