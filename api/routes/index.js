const express = require("express");
const router = express.Router();
const users = require("./users");
const favorites = require("./favorites");

router.use("/users", users);
router.use("/favorites", favorites);

module.exports = router;
