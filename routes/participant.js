var express = require("express");
var router = express.Router();

let participantController = require("../controllers/participant");
let authController = require("../controllers/auth");

router.get("/", participantController.getAll);
router.get("/:id", participantController.getByParticipant);
router.get("/activity/:id", participantController.getByActivity);

router.post(
  "/add",
  authController.requireAuth,
  participantController.processAdd
);
router.delete(
  "/delete/:id/",
  authController.requireAuth,
  participantController.processDelete
);

module.exports = router;
