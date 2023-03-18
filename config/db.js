let config = require("./config");

let mongoose = require("mongoose");
mongoose.set("strictQuery", true);

module.exports = function () {
  let db =
    process.env.NODE_ENV === "production" ? config.ATLASDB : config.LOCALDB;
  mongoose.connect(db);

  console.log("process.env.NODE_ENV : " + process.env.NODE_ENV);
  console.log("Connecting to db : " + db);

  let mongodb = mongoose.connection;
  mongodb.on("error", console.error.bind(console, "Connection Error:"));
  mongodb.once("open", () => {
    console.log("==== Connected to MongoDB ====");
  });
  return mongodb;
};
