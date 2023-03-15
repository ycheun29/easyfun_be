let mongoose = require("mongoose");

let activityModel = mongoose.Schema(
  {
    title: String,
    picture: String,
    description: String,
    status: {
      type: String,
      enum: ["Active", "Disable"],
      default: "Active",
    },
    startDate: Date,
    expireDate: Date,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    participant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    collection: "activity",
  }
);

module.exports = mongoose.model("Activity", activityModel);
