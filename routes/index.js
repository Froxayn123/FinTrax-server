const express = require("express");
const app = express();
const userRoutes = require("./userRoute");
const transactionRoutes = require("./transactionRoute");
const authRoutes = require("./authRoute");

const API = "/api/v1";

app.get("/", (req, res) => {
  res.send({ message: "App is listening" });
});

app.use(API, userRoutes);
app.use(API, transactionRoutes);
app.use(API, authRoutes);

module.exports = app;
