var express = require("express");
var router = express.Router();

let participantController = require("../controllers/participant");
let authController = require("../controllers/auth");

router.get("/", participantController.getParticipant);

router.post(
  "/add",
  authController.requireAuth,
  participantController.addParticipant
);
router.delete(
  "/delete/:id/",
  authController.requireAuth,
  participantController.deleteParticipant
);

module.exports = router;
