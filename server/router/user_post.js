const express = require("express");
const loginauth = require("../middleware/loginauth");
const jwt = require("jsonwebtoken");
const router = express.Router();
const POST = require("../Schema/post");
const USER = require("../Schema/model");

// folloing the user
router.put("/followuser", loginauth, async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(req.user._id);

    if (!userId) {
      return res
        .status(402)
        .json({ message: "some thing is wrong , try again" });
    }
    const user = await USER.findByIdAndUpdate(
      { _id: userId },
      {
        $push: { followers: req.user._id },
      },
      {
        new: true,
      }
    ).select("-password");

    const setfollowing = await USER.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: { following: user._id },
      },
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({ user, setfollowing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// unfolloing the user
router.put("/unfollowuser", loginauth, async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(req.user._id);

    if (!userId) {
      return res
        .status(402)
        .json({ message: "some thing is wrong , try again" });
    }

    const user = await USER.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: { followers: req.user._id },
      },
      {
        new: true,
      }
    ).select("-password");

    const setfollowing = await USER.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $pull: { following: user._id },
      },
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({ user, setfollowing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
