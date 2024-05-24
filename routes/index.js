const express = require("express");
const app = express();

const API = "/api/v1";

app.get("/", (req, res) => {
  res.send({ message: "App is listening" });
});

module.exports = app;
