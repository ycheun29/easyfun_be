let mongoose = require("mongoose");

let commentModel = mongoose.Schema(
  {
    commenter: String,
    comment: String,
    response: String,
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  },
  {
    collection: "comment",
  }
);

module.exports = mongoose.model("Comment", commentModel);
