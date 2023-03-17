var express = require("express");
var router = express.Router();

let activityController = require("../controllers/activity");

router.get("/", activityController.getAll);
router.post("/add", activityController.processAdd);
router.put("/edit/:id", activityController.processEdit);
router.delete("/delete/:id", activityController.processDelete);

module.exports = router;
