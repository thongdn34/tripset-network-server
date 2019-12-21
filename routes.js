import models from "./models";
const express = require("express");
const router = express.Router();
const { Post, User } = models;

router.get("/posts", async (req, res, next) => {
  const { userId, offset, limit } = req.query;
  let query = userId ? { author: userId } : {};
  const postsCount = await Post.find(query).countDocuments();
  const allPosts = await Post.find(query)
    .skip(+offset * 10 || 0)
    .limit(+limit || 10)
    .sort({ createdAt: "desc" });

  res.send({ count: postsCount, data: allPosts });
  next();
});

router.get("/users", async (req, res, next) => {
  const { userId, offset, limit } = req.query;
  let query = userId ? { _id: userId } : {};
  const userCount = await User.find(query).countDocuments();
  const allUser = await User.find(query)
    .skip((+offset - 1) * 10 || 0)
    .limit(+limit || 10)
    .sort({ createdAt: "desc" });

  res.send({ count: userCount, data: allUser });
  next();
});

//CHange status of user is active or disable
router.post("/update-status-acount", (req, res, next) => {
  const { userId, status } = req.body;
  User.findOneAndUpdate(
    { _id: userId },
    {
      $set: { isActive: !!status }
    },
    { new: true },
    (err, result) => {
      if (err) res.send({ err });
      else {
        res.send({ result });
        next();
      }
    }
  );
});

// //Create user
router.post("/user", async (req, res) => {
  try {
    var user = new User(req.body.user);
    var result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Edit user
router.put("/user/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(401);
      }
      if (typeof req.body.userEdit.email !== "undefined") {
        user.email = req.body.userEdit.email;
      }
      if (typeof req.body.userEdit.fullName !== "undefined") {
        user.fullName = req.body.userEdit.fullName;
      }
      if (typeof req.body.userEdit.username !== "undefined") {
        user.username = req.body.userEdit.username;
      }
      var result = user.save();
      res.send(result);
    })
    .catch(next);
});

// Delete user
router.delete("/user/:id", async (req, res) => {
  try {
    var result = await User.deleteOne({ _id: req.params.id }).exec();
    response.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
