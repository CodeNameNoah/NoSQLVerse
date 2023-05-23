// Importing the necessary modules
const express = require("express"); // Express framework for building web applications
const db = require("./config/connection"); // Database connection module
const routes = require("./routes"); // Routes module for handling API endpoints

const PORT = process.env.PORT || 3001; // Setting the port for the server to listen on
const app = express(); // Creating an instance of the Express application

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.json()); // Middleware to parse JSON bodies
app.use(routes); // Using the routes module to handle API endpoints

// Establishing a connection to the database and starting the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server currently running on port ${PORT}!`);
  });
});
