var express = require("express");
var router = express.Router();

let commentController = require("../controllers/comment");
let authController = require("../controllers/auth")

// Routers for getting comments
router.get("/", commentController.commentList);

// Routers for adding a comment
router.post("/add", commentController.processAdd);

// Routers for adding a response
router.put(
    "/edit/:id",
    authController.requireAuth,
    authController.isOwner,
    commentController.processEdit
  );

module.exports = router;