var express = require("express");
var router = express.Router();

let activityController = require("../controllers/activity");

router.get("/", activityController.getList);
router.post("/add", activityController.processAdd);
router.put("/edit/:id", activityController.processEdit);
router.delete("/delete/:id", activityController.processDelete);

router.post("/participant/add/:id/:userid", activityController.addParticipant);
router.delete(
  "/participant/delete/:id/:userid",
  activityController.deleteParticipant
);

module.exports = router;
