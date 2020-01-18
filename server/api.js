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
const Message = require("./models/message.js");
const MyFish = require("./models/myfish.js");
const AlmostMyFish = require("./models/almostmyfish.js");
const AllFish = require("./models/allfish.js");
const Money = require("./models/money.js");


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

router.get("/buyfish", (req, res) => {
  AlmostMyFish.find({googleid: req.query.googleid}).then((ff) => {
    res.send(ff);
  });
});

router.get("/habit", (req, res) => {
  Habit.find({ "creator_id": req.user._id }).then((habits) => {
    res.send(habits);
  });
})

router.post("/habit", (req, res) => {
  const newHabit = new Habit({
    creator_id: req.user._id,
    content: req.body.content,
  });
  newHabit.save().then((habit) => {
    res.send(habit);
  });
})
router.post("/buyfish", (req, res) => {
  const newfish = new AlmostMyFish({
    type: req.body.type,
    googleid: req.user.googleid,
  });
  console.log(`HELLOOOOO`);
  newfish.save().then((f) => {
    res.send(f);
  });
})


router.get("/todaysfish", (req, res) => {
  console.log("fail");
  let allFish = [{
    "type": "doryfish",
    "price": 25,
    "name": "dory",
  }, {
    "type": "blueyellowfish",
    "price": 20,
    "name": "angel",
  }, {
    "type": "purplecoral",
    "price": 14,
    "name": "coral",
  }];
  //randomizes order of allFish array
  for(let i = allFish.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = allFish[i]
    allFish[i] = allFish[j]
    allFish[j] = temp
  }
  let todaysFish = allFish.slice(2);
  let testfish = [1,2,3];
  res.send(allFish);
});

router.get("/money", (req, res) => {
  Money.find({googleid: req.query.googleid}).then((m) => {
    res.send(m);
  });
});

router.post("/money", (req, res) => {
  if (!Money.findOne({googleid: req.query.googleid})){
    Money.insertOne({
      googleid: req.query.googleid,
      money: req.body.money,
    })
  }
  else{
    Money.updateOne(
      {googleid: req.query.googlid},
      {$set: {money: req.body.money}}
    )
  }
  
});

router.get("/placefish", (req, res) => {
  MyFish.find({googleid: req.query.googleid}).then((ff) => {
    res.send(ff);
  });
});

router.post("/placefish", (req, res) => {
  const aquafish = new MyFish({
    type: req.body.type,
    googleid: req.user.googleid,
  });
  console.log(`placed fish in Aquarium!`);
  aquafish.save().then((f) => {
    res.send(f);
  });
});

router.post("/removeFish", (req, res) => {
  console.log(req.body.type);
  console.log(typeof(req.body.type));
  console.log(req.body.googleid);
  AlmostMyFish.deleteOne({"type": req.body.type, "googleid": req.body.googleid}).then ((deleted) => {
    res.send(deleted);
    console.log(`deleted fish ${req.body.type} from almostmyfish`);
  });
});


router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});



module.exports = router;
