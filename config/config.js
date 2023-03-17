require("dotenv").config();

module.exports = {
  ATLASDB: process.env.ATLASDB,
  LOCALDB: process.env.LOCALDB,
  SECRETKEY: process.env.SECRETKEY,
};
