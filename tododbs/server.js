//installation advice at bottom of file
const express = require("express");
const cors = require("cors");
const app = express();

const production = process.env.production;
const origin = production
  ? "https://cranky-ride-55b732.netlify.app/"
  : "http://localhost:3000";

//did not work locally unless I switched origin: origin below to origin: http...etc
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const path = require("path");
const todoitem = require("./models/todoitem");
const userinfo = require("./models/userinfo");

const db = require("./db/db.js");
console.log(db);

//const { getMaxListeners } = require("./models/user");

//const user = require("./models/user");
//const userprofile = require("./models/userprofile");
//???
//const { findById } = require("./models/message");
//???
app.use(express.json());
//mongoose.set("useFindAndModify", false);

//create db entry and retrieve the id for user purposes
app.post("/userinfo", (req, res) => {
  console.log("POSTING userinfo");
  const body = req.body;
  const userinfoObject = new userinfo(body);
  userinfoObject.save();
});

//getting the userinfo
app.get("/userinfo", (req, res) => {
  console.log("GETTING userinfo");

  userinfo
    .find(
      {},

      (error, data) => {
        console.log(JSON.stringify(data[data.length - 1]._id) + "stringify");
        res.json(data[0]._id);
      }
    )
    .sort("-createdAt");
});

//pushing listname to listarray
app.put("/userinfo", (req, res) => {
  console.log("PUT ON USERINFO START", req.params);
  console.log("value is", req.body);
  const body = req.body;
  const taskObject = new userinfo(body);
  console.log(taskObject);
  console.log("value is", body.listnamearray);
  // message.findOneAndDelete({ _id: req.params.id });
  userinfo
    .find({})
    .where("_id")
    .equals(body.userIdentification)
    .updateOne({}, { $push: { listnamearray: body.listnamearray } })
    .exec((error, data) => {
      console.log("body.listnamearray", body.listnamearray);
      console.log("PUT ON USERINFO COMPLETE", data);

      //res.json(data[0]._id);
    });
  //.sort("-createdAt");
});

// save name to list
app.put("/tasks", (req, res) => {
  console.log("PUT ON TASKS BEGIN", req.params);
  console.log("value is", req.body);
  const body = req.body;
  const taskObject = new todoitem(body);
  // message.findOneAndDelete({ _id: req.params.id });
  todoitem
    .find({})
    .where("userIdentification")
    .equals(body.userIdentification)
    .updateMany({}, { $set: { listname: body.listname } })
    .exec((error, data) => {
      console.log(body.saveName);
      console.log("PUT ON TASKS COMPLETE");
      console.log("the userIdentification is : " + body.userIdentification);
      console.log(body);

      //res.json(data[0]._id);
    });
  //.sort("-createdAt");
});

//save a message to the message collection
app.post("/tasks", (req, res) => {
  console.log("posting super task" + req.body);
  const body = req.body;
  const taskObject = new todoitem(body);
  taskObject.save();
});

//Pull the existing messages from the message collection so they can be displayed, sort by timestamp
app.get("/tasks", (req, res) => {
  console.log("GETTING MESSAGE");

  todoitem
    .find(
      {},

      (error, data) => {
        // console.log(JSON.stringify(data) + "stringify");
        return res.json(data);
      }
    )
    .sort("-createdAt");
});

//Delete a specific message using id
app.delete("/tasks/:id", (req, res) => {
  console.log("we are deleting", req.params);
  // message.findOneAndDelete({ _id: req.params.id });
  todoitem.findByIdAndDelete(req.params.id, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("delete is a success");
    }
  });
  // message.deleteOne({ _id: "ObjectId(" + req.params.id + ")" });
  res.send("delete message here");
});

//Delete a specific message using id

//sign up and save new user to db
/*
app.post("/userprofiles", (req, res) => {
  console.log("posting userprofiles now");
  console.log(req.body.email);
  const body = req.body;
  const userProfileObject = new userprofile(body);
  userprofile.findOne(
    {
      email: req.body.email,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error during finding");
      } else if (data == null) {
        console.log("null!" + data);
        userProfileObject.save(function (error) {
          console.log("done.");
          console.log(error);
          if (error) {
            console.log("issues here:" + error);
            return res.status(500).send("Server Error while saving");
          } else {
            return res.status(201).send("user saved");
          }
          return;
        });
      } else if (data != null) {
        console.log("not null!" + data);
        console.log("duplicate !! (email)");
        return res.status(400).send("duplicate email record");
      }
    }
  );
});
//Log in authentication
app.post("/authenticate", (req, res) => {
  console.log("posting");
  console.log(req.body.password);
  const body = req.body;
  const userObject = new userprofile(body);
  userprofile.findOne(
    {
      email: req.body.email,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Server Error during finding");
      } else if (data == null) {
        console.log("email does not exist" + data);
        return res.status(400).send("user doesn't exist");
      } else if (data != null) {
        console.log("user found" + data);
        if (req.body.password === data.password) {
          data.set("password", null);
          console.log("logging in");

          return res.status(200).json(data);
        } else {
          console.log(data.password);
          console.log(req.body.password);
          return res.status(400).send("password incorrect");
        }
      }
    }
  );
});
*/

/*
app.get("/messages", (req, res) => {
  console.log("sort VOTE");

  message
    .find(
      {},

      (error, data) => {
        // console.log(JSON.stringify(data) + "stringify");
        return res.json(data);
      }
    )
    .sort(message.positiveVote.length - message.negativeVote.length);
});*/

//add user vote to upvote array
/*
app.patch("/messages/:id", (req, res) => {
  console.log("we are voting up", req.params);
  console.log("value is", req.body);
  const body = req.body;
  // message.findOneAndDelete({ _id: req.params.id });
  message.findById(req.params.id).then((messageItem) => {
    if (!messageItem.positiveVote.includes(body.email)) {
      message.findByIdAndUpdate(
        req.params.id,
        { $push: { positiveVote: body.email } },
        function (error) {
          if (error) {
            console.log(error);
          } else {
            console.log("voting up is a success");
          }
        }
      );
    }
  });
  // message.deleteOne({ _id: "ObjectId(" + req.params.id + ")" });
  res.send("voting so good");
});

app.put("/messages/:id", (req, res) => {
  console.log("we are voting down", req.params);
  console.log("value is", req.body);
  const body = req.body;
  // message.findOneAndDelete({ _id: req.params.id });
  message.findById(req.params.id).then((messageItem) => {
    if (!messageItem.negativeVote.includes(body.email)) {
      message.findByIdAndUpdate(
        req.params.id,
        { $push: { negativeVote: body.email } },
        function (error) {
          if (error) {
            console.log(error);
          } else {
            console.log("voting down is a success");
          }
        }
      );
    }
  });

  // message.deleteOne({ _id: "ObjectId(" + req.params.id + ")" });
  res.send("voting so good");
});
*/

/*
//add user vote to downvote array
app.downvote("/messages/:id", (req, res) => {});
*/
//not used
//app.get("/userprofiles", (req, res) => {});

const buildPath = path.join(__dirname, "..", "build");
//app.use(express.static(buildPath));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Hello Server Running on " + port);
});

/* installation steps for creating new database (with mongodb and mongoose and express and node.js)
these steps are in order to run a new database locally.  structure should have react folder directory with a server directory inside that react folder

(install these below in the server directory (not the react application directory))
npm install express --save

npm install mongoose --save



switch uriold and uri old variables

compass create database.  give name as folder name (perhaps server in this case if folder is named server)
give name to collection that is associated with app.post or app.get calls ("/users?, (req, res) => { 
so in this case it should be users .....


readme usually has # with name of folder in it, not sure why . . . 


npm install cors--save


INSIDE THE SERVER.JS near top . . . 
const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

then you need to 
INSIDE db.js file near top
Mongoose.set("useFindAndModify", false);

*/
