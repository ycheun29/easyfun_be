let mongoose = require("mongoose");

let activityModel = mongoose.Schema(
  {
    title: String,
    price: Number,
    picture: String,
    description: String,
    status: {
      type: String,
      enum: ["Active", "Disable"],
      default: "Active",
    },
    date: Date,
    startTime: Date,
    endTime: Date,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      enum: [
        "Academic Tutorial",
        "Arts Class",
        "Culinary Workshop",
        "Fitness Course",
        "Music Lesson",
        "Social Event",
      ],
    },
  },
  {
    collection: "activity",
  }
);

module.exports = mongoose.model("Activity", activityModel);
