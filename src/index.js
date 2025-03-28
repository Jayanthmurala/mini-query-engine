const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./router");

const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware to process incoming data
app.use(bodyParser.json());

// Use our routes under /api
app.use("/api", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
