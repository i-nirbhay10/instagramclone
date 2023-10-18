const express = require("express");
const loginauth = require("../middleware/loginauth");
const router = express.Router();
const POST = require("../Schema/post");

// get all posts
router.get("/getuserprofile", loginauth, async (req, res) => {
  try {
    // console.log(req.user);
    const { name, _id, followers, following, username, photo } = req.user;
    const userdata = { name, _id, followers, following, username, photo };
    // const user = await req.user;
    // console.log(user);
    const userposts = await POST.find({ postedBy: _id })
      .populate("postedBy", "_id name followers following photo")
      .populate(
        "comments.postedBy",
        "_id name followers following photo username"
      );
    return res.status(200).json({ userposts, userdata });
  } catch (error) {
    console.log(error);
    res.json({ massege: "get error in getuserprofile" });
  }
});

// get all posts

router.get("/allpost", loginauth, async (req, res) => {
  try {
    const { name, _id, followers, following, username, photo } = req.user;
    const logeduser = { name, _id, followers, following, username, photo };
    const userposts = await POST.find()
      .populate("postedBy", "_id name followers following photo")
      .populate("comments.postedBy", "_id name followers following photo");
    // console.log(logeduser);
    return res.status(200).json({ userposts, logeduser });
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
    if (!photo) {
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

//user like on post
router.put("/userlike", loginauth, async (req, res) => {
  try {
    console.log(req.body.postId);
    const { name, _id, username } = req.user;
    const logeduser = { name, _id, username };
    const result = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("postedBy", "_id name followers following photo")
      .populate("comments.postedBy", "_id name followers following photo");
    if (result) {
      console.log("get user post like", result);
      return res.status(200).json({ result, logeduser });
    }
  } catch (error) {
    console.log(error);
    res.json({ massege: "get error in user like" });
  }
});

//user Unlike on post
router.put("/userunlike", loginauth, async (req, res) => {
  try {
    const result = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("postedBy", "_id name followers following photo")
      .populate("comments.postedBy", "_id name followers following photo");
    if (result) {
      console.log("get user post unlike", result);
      return res.status(200).json({ result });
    }
  } catch (error) {
    console.log(error);
    res.json({ massege: "get error in getuserprofile" });
  }
});

// users comment on post

router.put("/comment", loginauth, async (req, res) => {
  try {
    const { comment, postId } = await req.body;
    const data = {
      comment: comment,
      postedBy: req.user._id,
    };

    if (!comment || !postId) {
      return res.status(422).json({ massege: "plese write comment" });
    }
    const comment_result = await POST.findByIdAndUpdate(
      postId,
      {
        $push: { comments: data },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id name followers following photo")
      .populate("postedBy", "_id name followers following photo");

    console.log(comment_result);

    return res
      .status(200)
      .json({ massege: "comment sucsess full", comment_result });
  } catch (error) {
    console.log(error);
    res.json({ massege: "get error in comment" });
  }
});

// delete post

router.delete("/deletepost", loginauth, async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res
        .status(422)
        .json({ message: "Something is wrong, please try again" });
    }

    const post = await POST.findById(postId);

    // console.log(post);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.postedBy._id.toString() === req.user._id.toString()) {
      // return res.status(403).json({ message: "delete" });
      const result = await POST.findByIdAndDelete(postId); // Added "await" and store the result
      console.log(result);
      if (result) {
        return res.status(200).json({ message: "Post deleted" });
      } else {
        return res.status(500).json({ message: "Failed to delete the post" });
      }
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

//  get any user profile

router.get("/usersprofile/:id", loginauth, async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      console.log("not found");
      return res.status(404).json({ message: "user not found" });
    }

    const post = await POST.findById(postId).populate(
      "postedBy",
      "_id name followers following photo"
    );

    const userallposts = await post.postedBy._id;
    const userdata = await post.postedBy;

    const userposts = await POST.find({ postedBy: userallposts })
      .populate("postedBy", "_id name photo")
      .populate("comments.postedBy", "_id name followers following photo");

    // console.log(user);
    return res.status(200).json({ userposts, userdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
