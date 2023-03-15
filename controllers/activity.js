let Activity = require("../models/activity");

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

module.exports.getList = async function (req, res, next) {
  try {
    let activityList = await Activity.find()
      .populate({
        path: "owner",
        select: "firstName lastName username ",
      })
      .populate({
        path: "participant",
        select: "firstName lastName username ",
      });

    res.status(200).json(activityList);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};
