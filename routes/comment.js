var express = require("express");
var router = express.Router();

let commentController = require("../controllers/comment");

router.get("/", commentController.commentList);

module.exports = router;