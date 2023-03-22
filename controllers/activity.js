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

module.exports.getActivity = async function (req, res, next) {
  console.log("req.query: " + JSON.stringify(req.query));

  try {
    let activityList = await Activity.find(req.query).populate({
      path: "owner",
      select: "firstName lastName email username created",
    });

    res.status(200).json(activityList);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};
module.exports.getActivityWithActivityList = async function (req, res, next) {
  console.log("req.query: " + JSON.stringify(req.query));
  let criteria = {};
  let currentDate = new Date();
  criteria.status = "Active";
  criteria.startTime = { $lt: currentDate };
  criteria.endTime = { $gt: currentDate };
  criteria = { ...criteria, ...req.query };

  try {
    let activityList = await Activity.find(criteria).populate({
      path: "owner",
      select: "firstName lastName email username created",
    });

    res.status(200).json(activityList);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

module.exports.getActivityWithActivityManagement = async function (
  req,
  res,
  next
) {
  console.log("req.query: " + JSON.stringify(req.query));
  console.log("req.payload.id: " + req.payload.id);
  let criteria = {};
  criteria.owner = req.payload.id;
  criteria = { ...criteria, ...req.query };
  console.log("criteria: " + JSON.stringify(criteria));

  try {
    let activityList = await Activity.find(criteria).populate({
      path: "owner",
      select: "firstName lastName email username created",
    });

    res.status(200).json(activityList);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

module.exports.editActivity = (req, res, next) => {
  try {
    let id = req.params.id;

    let updatedItem = Activity({
      _id: id,
      title: req.body.title,
      price: req.body.price,
      picture: req.body.picture,
      description: req.body.description,
      status: req.body.status,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      owner:
        req.body.owner == null || req.body.owner == ""
          ? req.payload.id
          : req.body.owner,
      category: req.body.category,
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

module.exports.addActivity = (req, res, next) => {
  try {
    let newItem = Activity({
      _id: req.body.id,
      title: req.body.title,
      price: req.body.price,
      picture: req.body.picture,
      description: req.body.description,
      status: req.body.status,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      owner:
        req.body.owner == null || req.body.owner == ""
          ? req.payload.id
          : req.body.owner,
      category: req.body.category,
    });

    Activity.create(newItem, (err, item) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
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

module.exports.deleteActivity = (req, res, next) => {
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
