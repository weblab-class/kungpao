/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const FedFish = require("./models/fedfish.js");
const Habit = require("./models/habit.js");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case

router.get("/feedfish", (req, res) => {
  FedFish.find({googleid: req.query.googleid}).then((ff) => {
    res.send(ff);
  });
});

router.post("/feedfish", (req, res) => {
  const feed = new FedFish({
    name: req.user.name,
    googleid: req.user.googleid,
    lastfed: Date.now(),
  });
  console.log(`HELLOOOOO`);
  feed.save().then((f) => res.send(f));
});

router.get("/habit", (req, res) => {
  Habit.find({}).then((habits) => { // TODO only find habits belonging to this user
    res.send(habits);
  });
})

router.post("/habit", (req, res) => {
  const newHabit = new Habit({
    // googleid: req.user.googleid,
    googleid: 1,
    content: req.body.content,
  });
  newHabit.save().then((habit) => {
    res.send(habit);
  });
})

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});



module.exports = router;
