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

module.exports.processEdit = (req, res, next) => {
  try {
    let id = req.params.id;

    let updatedItem = Activity({
      _id: id,
      title: req.body.title,
      picture: req.body.picture,
      description: req.body.description,
      status: req.body.status,
      startDate: req.body.startDate,
      expireDate: req.body.expireDate,
      owner:
        req.body.owner == null || req.body.owner == ""
          ? req.payload.id
          : req.body.owner,
    });

    Activity.updateOne({ _id: id }, updatedItem, (err, result) => {
      if (err || result.modifiedCount == 0) {
        res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Activity updated successfully.",
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

module.exports.processAdd = (req, res, next) => {
  try {
    let newItem = Activity({
      _id: req.body.id,
      title: req.body.title,
      picture: req.body.picture,
      description: req.body.description,
      status: req.body.status,
      startDate: req.body.startDate,
      expireDate: req.body.expireDate,
      owner:
        req.body.owner == null || req.body.owner == ""
          ? req.payload.id
          : req.body.owner,
    });

    Activity.create(newItem, (err, item) => {
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
          message: "Activity added successfully.",
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

    Activity.updateOne({ _id: id }, { status: "Disable" }, (err, result) => {
      if (err || result.modifiedCount == 0) {
        console.log(err);

        res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Activity disabled successfully.",
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
