let Comment = require("../models/comment");

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

//Get commentList
module.exports.commentList = async function (req, res, next) {
  try {
    let commentList = await Comment.find().populate();

    res.status(200).json(commentList);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

// Adding Comment
module.exports.processAdd = (req, res, next) => {
  try {
    let activityId = req.params.activityId;
    console.log(activityId);
    let newItem = Comment({
      _id: req.body.id,
      comment: req.body.comment,
      commenter: req.body.commenter,
      activity: req.body.activity,
    });

    Comment.create(newItem, (err, item) => {
      if (err) {
        console.log(err);
        // res.end(err);
        res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        // refresh the  list
        console.log(item);
        // res.redirect('/');
        res.status(200).json(item);
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};
