const express = require("express");
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json()); //for json data reeding
dotenv.config({ path: "./.env" }); // useing dotenv
require("./database/connection");
app.use(require("./router/route"));
app.use(require("./router/post"));
app.use(require("./router/user_post"));

app.use(cors());
port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("app is runing on port no:" + port);
});
