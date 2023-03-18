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
    let commentList = await Comment.find().populate("commenter");

    res.status(200).json(commentList);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};