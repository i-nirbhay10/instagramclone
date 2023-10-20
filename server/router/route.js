const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const USER = require("../Schema/model");
const loginauth = require("../middleware/loginauth");

// Home router
router.get("/connect", (req, res) => {
  res.json("welcome");
});

// NEW USER RESISTER
router.post("/register", async (req, res) => {
  const { email, name, username, password } = req.body;

  try {
    if (!email || !name || !username || !password) {
      return res
        .status(422)
        .json({ message: "Please enter data in all fields" });
    }

    // Check if a user with the same email or username already exists.
    const userExist = await USER.findOne({ $or: [{ email }, { username }] });

    if (userExist) {
      return res.status(422).json({ message: "User already exists" });
    }

    // Create a new user instance and save it to the database.
    const newUser = new USER({ email, name, username, password });
    await newUser.save();

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
});

// TO SIGN IN
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Please enter data in all fields" });
  }

  try {
    const user = await USER.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        console.log(token);
        const { _id, photo, name, username } = user;
        const userdata = { _id, photo, name, username };
        return res.status(200).json({ token, userdata });
        // return res.status(200).json({ message: "Logged in sucsessfull" });
      } else {
        return res.status(422).json({ message: "Invalid email or password" });
      }
    } else {
      return res.status(422).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ error: "Login failed" });
  }
});

// TO google resister signin
router.post("/googlelogin", async (req, res) => {
  const { email, name, username, clientid } = req.body;
  if (email) {
    try {
      const user = await USER.findOne({ email: email });
      if (user) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        console.log(token);
        const { _id, photo, name, username } = user;
        const userdata = { _id, photo, name, username };
        return res.status(200).json({ token, userdata });
      } else {
        const password = email + clientid;
        const newUser = new USER({ email, name, username, password });
        await newUser.save();
        const user = await USER.findOne({ email: email });
        console.log(user);
        if (user) {
          const token = jwt.sign({ _id: user._id }, process.env.SECRET);
          console.log(token);
          const { _id, photo, name, username } = user;
          const userdata = { _id, photo, name, username };
          return res.status(200).json({ token, userdata });
        }
        // return res.status(200).json({ message: "Registration successful" });
      }
    } catch (error) {
      console.error("Google login failed:", error);
      res.status(500).json({ error: "Google login failed" });
    }
  }
});

// to update profile photo
router.put("/uploadprofilepic", loginauth, async (req, res) => {
  try {
    const { photo } = req.body;
    // if (!photo) {
    //   return res.status(402).json({ message: "image not set by user" });
    // }

    const user = await USER.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: { photo: photo },
      },
      {
        new: true,
      }
    );

    return res.status(200).json(user);

    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

//CREATE POST

// router.get("/createpost", loginauth, (req, res) => {
//   console.log(req.user);
//   res.json({ massege: "enter in creapost" });
// });

module.exports = router;
