const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "./.env" }); // useing dotenv
require("./database/connection");

port = 5000;

app.listen(port, () => {
  console.log("app is runing on port no:" + port);
});
