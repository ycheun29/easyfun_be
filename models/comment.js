let mongoose = require("mongoose");

let commentModel = mongoose.Schema(
  {
    commenter: String,
    comment: String,
    response: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    collection: "comment",
  }
);

module.exports = mongoose.model("Comment", commentModel);
