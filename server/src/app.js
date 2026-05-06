const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const bodyParser = require("body-parser");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "🦄",
  });
});

app.post("/", async (req, res) => {
  var data64 = req.body.data64;
  data64 = data64.replace(/^data:image\/jpeg;base64,/, "");
  data64 = data64.replace(/^data:image\/jpg;base64,/, "");
  data64 = data64.replace(/^data:image\/png;base64,/, "");
  data64 = data64.replace(/^data:image\/gif;base64,/, "");
  var fileName = `${uuidv4()}.png`;
  var filePath = path.join(__dirname, `../img/${fileName}`);
  console.log(filePath);
  require("fs").writeFileSync(filePath, data64, "base64");
  res.json({
    name: `https://monjolipasse-server.herokuapp.com/${fileName}`,
  });
});

app.use("/api/v1", api);

console.log(__dirname + "/../img");
app.use(express.static(__dirname + "/../img"));
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
module.exports = app;
