const express = require("express");
const mongoDB = require("./db");
const path = require("path");

const app = express();
const port = 5000;

// Connect to the database
mongoDB();

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// Default route
// app.get("/", (req, res) => {
//   res.send("Hello Js");
// });
app.use(express.static(path.join(__dirname, '../build')));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
