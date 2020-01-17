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
const Message = require("./models/message.js");
const MyFish = require("./models/myfish.js");
const AlmostMyFish = require("./models/almostmyfish.js");


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
  feed.save()//.then((f) => res.send(f));
});

router.get("/buyfish", (req, res) => {
  AlmostMyFish.find({googleid: req.query.googleid}).then((ff) => {
    res.send(ff);
  });
});

router.post("/buyfish", (req, res) => {
  const newfish = new AlmostMyFish({
    type: req.body.type,
    googleid: req.user.googleid,
  });
  console.log(`HELLOOOOO`);
  newfish.save() //.then((f) => res.send(f));
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
  aquafish.save()//.then((f) => res.send(f));
});


router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});



module.exports = router;
