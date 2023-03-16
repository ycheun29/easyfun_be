require("dotenv").config();

module.exports = {
  ATLASDB: process.env.ATLASDB,
  LOCALDB: process.env.LOCALDB,
  SECRET: process.env.SECRETKEY,
};
