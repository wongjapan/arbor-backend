var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
require("dotenv").config();

// const { isTokenOrAddress } = require("./controllers/onChain");

const { getRoburnaPrice } = require("./helpers/price");

//Allow all requests from all domains & localhost
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("OK");
});

app.get("/price", async function (req, res) {
  try {
    const price = await getRoburnaPrice();
    res.send({ ...price });
  } catch (error) {
    res.status(403);
    console.log(error);
  }
});

port = process.env.PORT || 3005;

app.listen(port, function () {
  console.log(`Arbor API running on port ${port}...`);
});
