const express = require("express");
const app = express();
const userRoutes = require("./userRoute");

const API = "/api/v1";

app.get("/", (req, res) => {
  res.send({ message: "App is listening" });
});

app.use(API, userRoutes);

module.exports = app;
