require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const cors = require("cors");
const routes = require("./api/routes");

app.use(express.json());
app.use(cors());

app.use((error, req, res, next) => {
  const response = {
    message: `${error.message}.`,
  };
  res.status(error.status || 500).json(response);
});

routes(app, path);

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.listen(port, () => {
  console.log("server up and running");
});
