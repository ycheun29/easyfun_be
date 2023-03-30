let mongoose = require("mongoose");

let participantModel = mongoose.Schema(
  {
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "participant",
  }
);

module.exports = mongoose.model("Participant", participantModel);
