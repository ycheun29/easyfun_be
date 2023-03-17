let Participant = require("../models/participant");

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  }
  if (err.message) {
    return err.message;
  } else {
    return "Unknown server error";
  }
}

module.exports.getByActivity = async function (req, res, next) {
  try {
    let id = req.params.id;
    let participantList = await Participant.find({ activity: id })
      .populate("activity")
      .populate({
        path: "participant",
        select: "firstName lastName email username created",
      });

    res.status(200).json(participantList);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

module.exports.getByParticipant = async function (req, res, next) {
  try {
    let id = req.params.id;
    let participantList = await Participant.find({ participant: id })
      .populate("activity")
      .populate({
        path: "participant",
        select: "firstName lastName email username created",
      });

    res.status(200).json(participantList);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

module.exports.getAll = async function (req, res, next) {
  try {
    let participantList = await Participant.find()
      .populate("activity")
      .populate({
        path: "participant",
        select: "firstName lastName email username created",
      });
    res.status(200).json(participantList);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

module.exports.processAdd = (req, res, next) => {
  try {
    let newItem = Participant({
      _id: req.body.id,
      activity: req.body.activity,
      participant: req.body.participant,
    });

    Participant.create(newItem, (err, item) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        console.log(item);
        res.status(200).json({
          success: true,
          message: "Participant added successfully.",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

module.exports.processDelete = (req, res, next) => {
  try {
    let id = req.params.id;

    Participant.deleteOne({ _id: id }, (err, result) => {
      if (err || result.modifiedCount == 0) {
        console.log(err);

        res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Participant deleted successfully.",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};
