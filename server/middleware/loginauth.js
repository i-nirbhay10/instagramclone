const jwt = require("jsonwebtoken");
const USER = require("../Schema/model");

const loginauth = async (req, res, next) => {
  try {
    // console.log("in loginauth");
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ error: "you must have login" });
    }

    const token = authorization.replace("Bearer ", "");
    // console.log(token);

    const getuserid = jwt.verify(token, process.env.SECRET);
    const userdata = await USER.findById({ _id: getuserid._id });
    // console.log(userdata);
    req.user = userdata;
    console.log("from loginauth");
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = loginauth;
