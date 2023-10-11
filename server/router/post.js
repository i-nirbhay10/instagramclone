const express = require("express");
const loginauth = require("../middleware/loginauth");
const router = express.Router();
const POST = require("../Schema/post");

// get all posts
router.get("/getuserprofile", loginauth, async (req, res) => {
  try {
    // console.log(req.user);
    const { name, _id, username } = req.user;
    const userdata = { name, _id, username };
    // const user = await req.user;
    // console.log(user);
    const userposts = await POST.find({ postedBy: _id })
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name username");
    return res.status(200).json({ userposts, userdata });
  } catch (error) {
    console.log(error);
    res.json({ massege: "get error in getuserprofile" });
  }
});

// get all posts

router.get("/allpost", loginauth, async (req, res) => {
  try {
    const { name, _id, username } = req.user;
    const logeduser = { name, _id, username };
    const userposts = await POST.find()
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name username");
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
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name username");
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
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name username");
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
      .populate("comments.postedBy", "_id name username")
      .populate("postedBy", "_id name");

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

// router.delete("/deletepost", loginauth, async (req, res) => {
//   try {
//     const { postId } = await req.body;
//     // const data = {
//     //   postedBy: req.user._id,
//     // };

//     if (!postId) {
//       return res
//         .status(422)
//         .json({ massege: "some thing is wrong pleese try again" });
//     }
//     const result = await POST.findByIdAndDelete(postId).populate(
//       "postedBy",
//       "_id name"
//     );
//     // .populate("comments.postedBy", "_id name username")
//     // const postedById = await result.postedBy._id;
//     if (result.postedBy._id.toString() === req.user._id.toString()) {
//       console.log("information match");
//       result.remove();
//     }

//     // console.log(postedById);
//     // console.log(req.user._id.toString());

//     return res.status(200).json({ massege: "post deleted" });
//   } catch (error) {
//     console.log(error);
//     res.json({ massege: "get error in comment" });
//   }
// });

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

    // const result = await POST.findByIdAndDelete(postId); // Added "await" and store the result

    // if (result) {
    //   return res.status(200).json({ message: "Post deleted" });
    // } else {
    //   return res.status(500).json({ message: "Failed to delete the post" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;

//user like
// router.put("/userlike", loginauth, async (req, res) => {
//   try {
//     // console.log(req.user);
//     // const user = await req.user;
//     console.log(req.body.postId);

//     const result = await POST.findByIdAndUpdate(
//       req.body.postId,
//       {
//         $push: { likes: req.user._id },
//       },
//       {
//         new: true,
//       }
//     ).populate("postedBy", "_id name Photo");
//     if (result) {
//       console.log("get user post like", result);
//       return res.status(200).json(result);
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ massege: "get error in user like" });
//   }
// });

// //user like
// router.put("/userunlike", loginauth, async (req, res) => {
//   try {
//     // console.log(req.user);
//     // const user = await req.user;
//     // const userposts = await POST.findByIdAndUpdate(req.body.postId, {
//     console.log(req.body.postId);
//     const result = await POST.findByIdAndUpdate(
//       req.body.postId,
//       {
//         $pull: { likes: req.user._id },
//       },
//       {
//         new: true,
//       }
//     );
//     if (result) {
//       console.log("get user post unlike", result);
//       return res.status(200).json(result);
//     }

//     // .exec((err, result) => {
//     //   if (err) {
//     //     return res.status(422).json({ erorr: err });
//     //   } else {
//     //     return res.status(200).json({ result });
//     //   }
//     // });
//   } catch (error) {
//     console.log(error);
//     res.json({ massege: "get error in getuserprofile" });
//   }
// });
