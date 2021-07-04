const mongoose = require("../db/db");
const schema = mongoose.Schema;
const userinfo = new schema(
  {
    username: String,
    email: String,
    password: String,
    listnamearray: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("userinfo", userinfo);
