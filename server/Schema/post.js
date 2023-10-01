const mongoose = require("mongoose");
const USER = require("./model");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  photo: {
    type: "string",
    require: true,
  },
  caption: {
    type: "string",
    require: true,
  },
  postedBy: {
    type: ObjectId,
    ref: USER,
  },
});

const POST = mongoose.model("POST", postSchema);

module.exports = POST;
