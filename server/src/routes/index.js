const express = require('express');
const router = express.Router();

const admin = require("./admin");
const users = require("./users");
const videos = require("./videos");
const comments = require("./comments");
const likes = require("./likes");
const friends = require("./friends");

router.use("/admin", admin);
router.use("/users", users);
router.use("/videos", videos);
router.use("/comments", comments);
router.use("/likes", likes);
router.use("/friends", friends);

module.exports = router;