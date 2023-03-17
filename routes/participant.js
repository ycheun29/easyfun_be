var express = require("express");
var router = express.Router();

let participantController = require("../controllers/participant");

router.get("/", participantController.getAll);
router.get("/:id", participantController.getByParticipant);
router.get("/activity/:id", participantController.getByActivity);

router.post("/add", participantController.processAdd);
router.delete("/delete/:id/", participantController.processDelete);

module.exports = router;
