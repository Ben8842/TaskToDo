const Mongoose = require("mongoose");
Mongoose.set("useFindAndModify", false);
//on server.js file the  app.post("/users" is associated with the name of your db collection
//the db name is associated with the uri (/messages for example) in the db.js file (this file)
//const uriold = "mongodb://127.0.0.1:27017/messages";

const uri = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://127.0.0.1:27017/tododbs";

Mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = Mongoose.connection;
connection.once("open", function (error) {
  if (error) {
    console.log(error + " :this is a DB error here");
  } else {
    console.log("connection established for TO DO TASK LIST");
  }
});

module.exports = Mongoose;
