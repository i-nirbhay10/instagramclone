const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: "string",
    require: true,
  },
  name: {
    type: "string",
    require: true,
  },
  username: {
    type: "string",
    require: true,
  },
  password: {
    type: "string",
    require: true,
  },
});

mongoose.model("USER", userSchema);
