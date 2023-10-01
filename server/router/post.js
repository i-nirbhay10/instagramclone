const express = require("express");
const loginauth = require("../middleware/loginauth");
const router = express.Router();
const POST = require("../Schema/post");

// get all posts

router.get("/getuserprofile", loginauth, async (req, res) => {
  try {
    // console.log(req.user);
    const user = await req.user;
    console.log(user);
    const userposts = await POST.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id name"
    );

    return res.status(200).json({ userposts, user });
  } catch (error) {
    console.log(error);
    res.json({ massege: "get error in getuserprofile" });
  }
});

// get all posts

router.get("/allpost", loginauth, async (req, res) => {
  try {
    const userposts = await POST.find().populate("postedBy", "_id name");
    // console.log(userposts);

    return res.status(200).json(userposts);
  } catch (error) {
    console.log(error);
    res.json({ massege: "get error in create post" });
  }
});

// creating posts

router.post("/createpost", loginauth, async (req, res) => {
  try {
    const { photo, caption } = req.body;
    console.log("hit");
    if (!photo || !caption) {
      return res.status(422).json({ massege: "plese enter data in all feald" });
    }

    // console.log(result);

    const post = new POST({
      photo,
      caption,
      postedBy: req.user,
    });

    const result = await post.save();
    console.log(result);
    return res.status(200).json({ massege: "post sucsessful" });
  } catch (error) {
    res.json({ massege: "get error in create post" });
  }
});

module.exports = router;
