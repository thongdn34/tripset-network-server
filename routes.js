import models from './models';
const express = require("express");
const router = express.Router();
const { Post, User } = models

router.get('/posts', async (req, res, next) => {
  const { userId, skip, limit } = req.query;
  let query = { author: { $ne: userId } }
  const postsCount = await Post.find(query).countDocuments();
  const allPosts = await Post.find(query)
    .skip(skip || 0)
    .limit(limit || 10)
    .sort({ createdAt: 'desc' });

  res.send({ count: postsCount, data: allPosts });
  next();
});

//CHange status of user is active or disable
router.post('/update-status-acount', (req, res, next) => {
  const { userId, status } = req.body;
  User.findOneAndUpdate({ _id: userId }, {
    $set: { isActive: !!status }
  }, { new: true }, (err, result) => {
    if (err) res.send({ err });
    else {
      res.send({ result });
      next();
    }
  })
})

module.exports = router;
