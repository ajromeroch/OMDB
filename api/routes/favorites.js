const express = require("express");
const router = express.Router();
const { Favorites, User } = require("../models");

router.post("/user", (req, res, next) => {
  const { Title, Year, imdbID, Type, Poster } = req.body.e;
  const { email } = req.body.user;
  User.findOne({ where: { email } }).then((data) => {
    Favorites.create({
      Title,
      Year,
      imdbID,
      Type,
      Poster,
      userId: data.id,
    }).then(() => res.sendStatus(201));
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Favorites.findAll({ where: { userId: id }, include: "user" }).then((data) =>
    res.send(data)
  );
});

module.exports = router;
