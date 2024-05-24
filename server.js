//Initialize
require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./configs/connect");

//Configurations
const routerAPI = require("./routes/index");
const logger = require("./middlewares/logger");
const handlingError = require("./middlewares/handlingError");
const PORT = process.env.PORT;

db;

//Router
app.use(routerAPI);

//Middleware
app.use(express.json()).use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(handlingError);

app.listen(PORT, () => {
  console.log(`App is listening to http://localhost:${PORT}`);
});
