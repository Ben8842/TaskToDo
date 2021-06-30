const mongoose = require("../db/db");
const schema = mongoose.Schema;
//mongoose.set("useFindAndModify", false);
const todoitem = new schema(
  {
    text: String,
    listname: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("todoitem", todoitem);
