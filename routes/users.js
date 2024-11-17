const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("user list");
});

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/", (req, res) => {
  res.send("new user created");
  console.log(req.body.firstName);
});

router
  .route("/:userId")
  .get((req, res) => {
    req.params.userId;
    console.log(req.user)
    res.send(`Get user with ID ${req.user.name}`);
  })
  .put((req, res) => {
    req.params.userId;
    res.send(`update user with ID ${req.params.userId}`);
  })
  .delete((req, res) => {
    req.params.userId;
    res.send(`delete user with ID ${req.params.userId}`);
  });
const users = [{ name: "sally" }, { name: "jacob" }];
router.param("userId", (req, res, next, userId) => {
  console.log(userId);
  req.user = users[userId];
  next();
});
module.exports = router;
