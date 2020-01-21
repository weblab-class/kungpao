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
const TodayFish = require("./models/todayfish");

const ObjectID = require('mongodb').ObjectID;

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
    date: new Date(),
  });
  newHabit.save().then((habit) => {
    res.send(habit);
  });
})

router.post("/updateHabit", (req, res) => {
  if (req.body.date) {
    Habit.updateOne(
      {"_id": ObjectID(req.body.id)},
      {$set: {isDone: req.body.isDone}},
      {$set: {date: req.body.date}},
    ).then((habit) => res.send(habit));
  }
  else {
    Habit.updateOne(
      {"_id": ObjectID(req.body.id)},
      {$set: {isDone: req.body.isDone}},
    ).then((habit) => res.send(habit));
  }
})

// TODO: will not pass a security review. fix. 
router.post("/incrementMoney", (req, res) => {
  Money.updateOne(
    {"creator_id": req.user._id},
    {$inc: {money: req.body.amount}}
  ).then((money) => res.send(money));
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


router.get("/todaysfish", async (req, res) => {
  const dateNow = new Date();
  const dateNowString = `aa${dateNow.getFullYear()}${dateNow.getMonth()}${dateNow.getDate()}`
  const todayFishes = await TodayFish.findOne({date: dateNowString});
  if (todayFishes !== null) {
    return res.json(todayFishes.fishes);
  }
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
  },{
    "type": "clownfish",
    "price": 30,
    "name": "nemo",
  },
  {
    "type": "greenyellowpuffer",
    "price": 5,
    "name": "green puff",
  },
  {
    "type": "peachpuffer",
    "price": 5,
    "name": "peach puff",
  },
  {
    "type": "patchyfish",
    "price": 7,
    "name": "patch",
  },
  {
    "type": "pinkfish",
    "price": 10,
    "name": "pinky",
  },
  {
    "type": "purplepeachfish",
    "price": 45,
    "name": "purp peach",
  },
  {
    "type": "seaweed",
    "price": 3,
    "name": "seaweed",
  },
  {
    "type": "yellowfish",
    "price": 15,
    "name": "yellow",
  },
];
  //randomizes order of allFish array
  for(let i = allFish.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = allFish[i]
    allFish[i] = allFish[j]
    allFish[j] = temp
  }
  let todaysFish = allFish.slice(2);
  let testfish = [1,2,3];

  console.log(todaysFish)
  await TodayFish.create({
    date: dateNowString,
    fishes: todaysFish
  })
  
  res.send(todaysFish);
});

router.get("/money", (req, res) => {
  Money.findOne({"creator_id": req.user._id }).then((m) => {
    if (m === null) {
      res.send({money: null});
    }
    else {
      res.send(m);
    }
    
  });
});

router.post("/createmoney", (req, res) => {
  const newMoney = new Money({
    creator_id: req.user._id,
    money: 0,
  });
  newMoney.save().then((money) => {
    res.send(money);
  });
})

router.post("/money", (req, res) => {
  Money.updateOne(
    {"creator_id": req.user._id},
    {$set: {money: req.body.money}}
  ).then((money) => res.send(money));
})

router.get("/placefish", (req, res) => {
  MyFish.find({googleid: req.query.googleid}).then((ff) => {
    res.send(ff);
  });
});

// TODO: an inventory check needs to happen before a new MyFish instance is created
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

router.post("/chat", (req, res) => {
  const newMessage = new Message({
    recipient: req.body.recipient,
    sender: req.body.sender,
    content: req.body.content,
    timestamp: Date.now(),
  })
  console.log(`a message!`);
  newMessage.save().then((f) => res.send(f));

});

router.get("/chat", (req, res) => {
  // get messages that are from me->you OR you->me
  let query = {
      $or: [
        { "sender": req.user._id, "recipient": 'ray' },
        { "sender": 'ray', "recipient": req.user._id },
      ],
    };
  //Message.find(query).then((messages) => console.log("these are " + messages));

  Message.find(query).then((messages) => res.send(messages));
});



router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});



module.exports = router;
