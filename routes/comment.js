var express = require("express");
var router = express.Router();

let commentController = require("../controllers/comment");

// Routers for getting comments
router.get("/", commentController.commentList);

// Routers for adding a comment
router.post("/add", commentController.processAdd);

// Response


module.exports = router;