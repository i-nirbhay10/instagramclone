const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

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
  photo: {
    type: "string",
  },
  following: [
    {
      type: ObjectId,
      ref: "USER",
    },
  ],
  followers: [
    {
      type: ObjectId,
      ref: "USER",
    },
  ],
});

const USER = mongoose.model("USER", userSchema);

module.exports = USER;
