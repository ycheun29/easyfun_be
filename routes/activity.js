var express = require("express");
var router = express.Router();

let activityController = require("../controllers/activity");
let authController = require("../controllers/auth");

router.get("/", activityController.getAll);
router.post("/add", authController.requireAuth, activityController.processAdd);
router.put(
  "/edit/:id",
  authController.requireAuth,
  authController.isAllowed,
  activityController.processEdit
);
router.delete(
  "/delete/:id",
  authController.requireAuth,
  authController.isAllowed,
  activityController.processDelete
);

module.exports = router;
