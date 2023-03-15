let config = require("./config");

let mongoose = require("mongoose");
mongoose.set("strictQuery", true);

module.exports = function () {
  mongoose.connect(
    process.env.NODE_ENV === "production" ? config.ATLASDB : config.LOCALDB
  );

  let mongodb = mongoose.connection;
  mongodb.on("error", console.error.bind(console, "Connection Error:"));
  mongodb.once("open", () => {
    console.log("==== Connected to MongoDB ====");
  });
  return mongodb;
};
