var express = require("express");
var router = express.Router();

let activityController = require("../controllers/activity");

router.get("/", activityController.getList);
module.exports = router;
