const express = require("express");
const app = express();
const userRoutes = require("./userRoute");
const transactionRoutes = require("./transactionRoute");
const authRoutes = require("./authRoute");
const quizRoutes = require("./quizRoute");
const adminRoutes = require("./adminRoute");

const API = "/api/v1";

app.get("/", (req, res) => {
  res.send({ message: "App is listening" });
});

app.use(API, userRoutes);
app.use(API, transactionRoutes);
app.use(API, authRoutes);
app.use(API, quizRoutes);
app.use(API, adminRoutes);

module.exports = app;
