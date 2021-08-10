const express = require("express");
const router = express.Router();
const { User } = require("../models");
const passport = require("passport");

router.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch((err) => err);
});

router.post("/register", (req, res, next) => {
  User.create(req.body)
    .then((users) => res.send(users))
    .catch((err) => err);
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.send(req.user);
});

router.post("/logout", (req, res, next) => {
  req.logOut();
  res.sendStatus(200);
});

router.get("/me", (req, res, next) => {
  if (!req.user) res.sendStatus(401);

  res.send(req.user);
});

module.exports = router;
