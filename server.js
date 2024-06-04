//Initialize
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const express = require("express");
const app = express();

//Configurations
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { executeTable } = require("./configs");
const routerAPI = require("./routes/index");
const { logger } = require("./middlewares/logger");
const handlingError = require("./middlewares/handlingError");
const PORT = process.env.PORT;
executeTable();

//Middleware
app.use(cors({ credentials: true, origin: process.env.CORS }));
app.use(cookieParser());
app.use(express.json()).use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(handlingError);

//Router
app.use(routerAPI);

app.listen(PORT, () => {
  console.log(`App is listening to http://localhost:${PORT}`);
});
