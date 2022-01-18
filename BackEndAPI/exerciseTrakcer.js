const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

mongoose.connect(process.env["MONGO_URI"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  username: String,
  description: String,
  duration: Number,
  date: Date,
});

const userSchema = new Schema({
  username: String,
});

let Exercise = mongoose.model("Exercise", exerciseSchema);
let User = mongoose.model("User", userSchema);

//You can POST to /api/users with form data username to create a new user
app.post("/api/users", (req, res) => {
  let usernameString = req.body.username;
  User.findOne({ username: usernameString }, function (err, userFound) {
    if (err) return console.log(err);
    if (userFound) {
      res.send(
        "This username already exist. Maybe try " + usernameString + "_" + 2
      );
    } else {
      let newUser = new User({ username: usernameString });
      newUser.save((err, userCreated) => {
        if (err) {
          console.log(err);
        }
        const { _id, username } = userCreated;
        res.json({ username, _id });
      });
    }
  });
});

//You can make a GET request to /api/users to get a list of all users
app.get("/api/users", function (req, res) {
  User.find({}).then(function (users) {
    res.json(users);
  });
});

app.get("/api/users/:_id/logs", function (req, res) {
  User.findOne({ _id: req.params._id }, function (err, userFound) {
    if (err) return console.log(err);
    if (userFound) {
      Exercise.find(
        { username: userFound.username },
        function (err, exerciseFound) {
          if (err) return console.log(err);
          exerciseFound = exerciseFound.map((exercise) => ({
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString(),
          }));
          if (req.query.from) {
            let dateFrom = new Date(req.query.from);
            exerciseFound = exerciseFound.filter(
              (exercise) => new Date(exercise.date) > dateFrom
            );
          }
          if (req.query.to) {
            let dateTo = new Date(req.query.to);
            exerciseFound = exerciseFound.filter(
              (exercise) => new Date(exercise.date) < dateTo
            );
          }
          if (req.query.limit) {
            exerciseFound = exerciseFound.slice(0, req.query.limit);
          }
          let logObject = {
            _id: req.params._id,
            username: userFound.username,
            count: exerciseFound.length,
            log: exerciseFound,
          };
          res.json(logObject);
        }
      );
    } else {
      res.send(
        "This username does not exist. Try https://boilerplate-project-exercisetracker.mk-malz.repl.co/api/users to find a list of existing users."
      );
    }
  });
});
//You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used
//The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added
app.post("/api/users/:_id/exercises", (req, res) => {
  User.findOne({ _id: req.params._id }, function (err, userFound) {
    if (err) return console.log(err);
    if (userFound) {
      let usernameExercise = userFound.username;
      let dateExercise = req.body.date;
      if (dateExercise == null) {
        dateExercise = new Date(Date.now());
      } else {
        dateExercise = new Date(req.body.date);
      }
      dateExercise = dateExercise.toDateString();
      let newExercise = new Exercise({
        username: usernameExercise,
        description: req.body.description,
        duration: parseInt(req.body.duration),
        date: dateExercise,
      });

      newExercise.save((err, exerciseCreated) => {
        if (err) {
          console.log(err);
        }
        let resObject = {
          _id: req.params._id,
          username: usernameExercise,
          date: dateExercise,
          duration: parseInt(req.body.duration),
          description: req.body.description,
        };
        res.json(resObject);
      });
    } else {
      res.send(
        "This username does not exist. Try https://boilerplate-project-exercisetracker.mk-malz.repl.co/api/users to find a list of existing users."
      );
    }
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
