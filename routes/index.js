var express = require("express");
var router = express.Router();
let indexController = require("../controllers/index");

router.get("/", indexController.home);

module.exports = router;
