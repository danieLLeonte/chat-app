var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", function (req, res, next) {
  roomname = req.body.roomname;
  username = req.body.username;
  res.redirect(`/room?username=${username}&roomname=${roomname}`);
});

module.exports = router;
