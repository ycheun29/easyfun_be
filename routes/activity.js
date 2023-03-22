var express = require("express");
var router = express.Router();

let activityController = require("../controllers/activity");
let authController = require("../controllers/auth");

router.get("/", activityController.getActivity);

router.get("/activityList", activityController.getActivityWithActivityList);
router.get(
  "/activityManagement",
  authController.requireAuth,
  activityController.getActivityWithActivityManagement
);

router.get("/", activityController.getActivity);

router.post("/add", authController.requireAuth, activityController.addActivity);
router.put(
  "/edit/:id",
  authController.requireAuth,
  authController.isAllowed,
  activityController.editActivity
);
router.put(
  "/delete/:id",
  authController.requireAuth,
  authController.isAllowed,
  activityController.deleteActivity
);

module.exports = router;
