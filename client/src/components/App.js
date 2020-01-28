import React, { Component } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js"
import NotFound from "./pages/NotFound.js";
import Aquarium from "./pages/Aquarium.js";
import Habits from "./pages/Habits.js";
import Store from "./pages/Store.js";
import Inventory from "./pages/Inventory.js";
import Login from "./pages/Login.js";
import Tour from 'reactour'

const GOOGLE_CLIENT_ID = "707474204069-ibaig6vr8u2gf995465eel35t6kf6u1r.apps.googleusercontent.com";
const steps = [
  {
    selector: '',
    content: 'Welcome to Habit Aquarium! *insert description of usage here*',
  },
  {
    selector: '[data-tut="navbarhabits"]',
    content: "Let's get started with some habits.",
  },
  {
    selector: '[data-tut="newhabit"]',
    content: "Time to create your first daily habit! Think of something you'd like to do every day, then hit enter or use the + to add your habit.",
    action: node => {
      // by using this, focus trap is temporary disabled
      console.log(node)
    },
    //disableInteraction: false,
  },
  {
    selector: '[data-tut="habittabs"]',
    content: "Switch between tabs to add goals you'd like to complete every day, week, or month."
  },
  {
    selector: '[data-tut="habitbalance"]',
    content: "Maintain your habits to earn sand dollars.",
  },
  {
    selector:'[data-tut="navbarstore"]',
    content: "What can you do with sand dollars? Talk to Ray, our friendly fish store associate to buy fish for your aquarium.",
  },
  {
    selector:'[data-tut="navbaraquarium"]',
    content: "Let's take a look at your aquarium. This is where all your fish will live!",
  },
  {
    selector: '[data-tut="placeitemsbutton"]',
    content:"Place items you've bought into your aquarium using the place items button.",
    
  },
  {
    selector:'[data-tut="feedfishbutton"]',
    content: "Remember to feed your fish everyday! If you don't feed your fish in 3 days, your oldest fish dies.",
  },
  {
    selector:'[data-tut="navbarinventory"]',
    content:"Got too many fish? Sell some back to Ray on the Inventory page!",
  },
  {
    selector:'',
    content:"Here's one sand dollar to help you get your aquarium started! Best of luck building new habits!",
  }
];

import "./App.css";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

import doryfish from "./data/doryfish.png";
import byfish from "./data/blueyellowfish.png";
import cfish from "./data/clownfish.png";
import gyp from "./data/greenyellowpuffer.png";
import patch from "./data/patchyfish.png";
import peach from "./data/peachpuffer.png";
import pink from "./data/pinkfish.png";
import purplepeach from "./data/purplepeachfish.png";
import yfish from "./data/yellowfish.png";
import algae from "./data/algae.png";
import mcfish from "./data/multicolorfish.png";
import plankton from "./data/plankton.png";
import ppfish from "./data/purplepatternedfish.png";
import shrimp from "./data/shrimp.png";
import striped from "./data/stripedfish.png";
import turtle from "./data/turtle.png";
import octopus from "./data/octopus.png";
import seahorse from "./data/seahorse.png";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  
  
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      lastFed: undefined,
      gId: undefined,
      showPopup: false,
      popText: "",
      pickFish: false,
      placedfish: [],
      notplaced: [],
      releasedHeart: false,
      fishDie: false,
      lastDead: undefined,
      deadFish: [],
      isTourOpen: null,
      completedTutorial: null,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id, gId: user.googleid});
        // get("/api/feedfish", {googleid: this.state.gId}).then((ff) => {
        //   this.setState( {
        //     lastFed : ff,
        //   });
        // });
        
        get("/api/buyfish", {googleid: user.googleid}).then((f) => {
          this.setState({notplaced : f});
          console.log(this.state.notplaced);
          console.log(this.state.notplaced[0]);
        });
        get("/api/placefish", {googleid: user.googleid}).then((f) => {
          this.setState({placedfish : f});
          get("/api/feedfish", {googleid: this.state.gId}).then((ff) => {
            let temp = 0;
            if (typeof ff == undefined) {
              temp = 0;
            }
            else if (ff.length == 0) {
              temp = 0;
            }
            else {
              temp  = ff[ff.length -1];
              console.log("what?");
            }
            this.setState( {
              lastFed : temp,
            });
            console.log(this.state.lastFed);
            if (f.length > 0) {
              get("/api/killFish", {googleid: this.state.gId}).then((d) => {
                this.setState({
                  lastDead: d,
                });
                console.log(d);
                if (Date.now() - Date.parse(temp.lastfed) > 259200000 && temp != 0) {
  
                  let numFishDead = Math.floor((Date.now() - Date.parse(temp.lastfed)) / 259200000);
                  if (numFishDead > f.length-1) {
                    numFishDead = f.length - 1;
                  }
                  console.log(numFishDead);
                  if (typeof d == undefined || d.length == 0){
                    console.log("suppp");
                    this.setState({
                      popText: "You haven't fed your fish for three days... unfortunately your oldest fish has died.",
                      deadFish: f.slice(0, numFishDead),
                    });
                    this.fishDieToggle();
                  }
                  else if (Date.now() - Date.parse(d[d.length-1].timestamp) > 259200000){
                    console.log('?????');
                    this.setState({
                      popText: "You haven't fed your fish for three days... unfortunately your oldest fish has died.",
                      deadFish: f.slice(0, numFishDead),
                    });
                    this.fishDieToggle();
                  }
                  
                };
              
              });
            };
          });
        });
        
        
      }
    });
    
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id, gId: user.googleid, });
      post("/api/initsocket", { socketid: socket.id });
      get("/api/buyfish", {googleid: user.googleid}).then((f) => {
        this.setState({notplaced : f});
        console.log(this.state.notplaced);
        console.log(this.state.notplaced[0]);
      });
      get("/api/tutorial", {googleid: user.googleid}).then((f) => {
        //console.log(f);
        if (f.googleid == null) {
          console.log("never been here")
          console.log(this.state.isTourOpen)
          this.setState({completedTutorial: false, isTourOpen: true})
          console.log(this.state.isTourOpen)

        }
        else {
          console.log('itsmeagain')
          this.setState({completedTutorial: true, isTourOpen: false})
        }
      });

      get("/api/placefish", {googleid: user.googleid}).then((f) => {
        this.setState({placedfish : f});
        get("/api/feedfish", {googleid: this.state.gId}).then((ff) => {
          let temp = 0;
          if (typeof ff == undefined) {
            temp = 0;
          }
          else if (ff.length == 0) {
            temp = 0;
          }
          else {
            temp  = ff[ff.length -1];
            console.log("what?");
          }
          this.setState( {
            lastFed : temp,
          });
          console.log(this.state.lastFed);
          if (f.length > 0) {
            get("/api/killFish", {googleid: this.state.gId}).then((d) => {
              this.setState({
                lastDead: d,
              });
              console.log(d);
              if (Date.now() - Date.parse(temp.lastfed) > 259200000 && temp != 0) {

                let numFishDead = Math.floor((Date.now() - Date.parse(temp.lastfed)) / 259200000);
                if (numFishDead > f.length-1) {
                  numFishDead = f.length - 1;
                }
                console.log(numFishDead);
                if (typeof d == undefined || d.length == 0){
                  console.log("suppp");
                  this.setState({
                    popText: "You haven't fed your fish for three days... unfortunately your oldest fish has died.",
                    deadFish: f.slice(0, numFishDead),
                  });
                  this.fishDieToggle();
                }
                else if (Date.now() - Date.parse(d[d.length-1].timestamp) > 259200000){
                  console.log('?????');
                  this.setState({
                    popText: "You haven't fed your fish for three days... unfortunately your oldest fish has died.",
                    deadFish: f.slice(0, numFishDead),
                  });
                  this.fishDieToggle();
                }
                
              };
            
            });
          };
        });
      });
      
        get("api/money").then((money) => {
          console.log('MONEYRIP ' + money.money);
          if (money.money == null) {
            console.log("creating money");
            post("api/createMoney").then((money) => {
              console.log(money);
            });
          }
        });
        get("api/name").then((name) => {
          console.log('namerip ' + name.name);
          if (name.name == null) {
            console.log("creating name");
            post("api/newName").then((name) => {
              console.log(name);
            });
          }
        });
      
      
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };


  checkifFed = () => {
    console.log(this.state.gId);

    get("/api/feedfish", {googleid: this.state.gId}).then((ff) => {
      let temp = 0;
      if (typeof ff == undefined) {
        temp = 0;
      }
      else if (ff.length == 0) {
        temp = 0;
      }
      else {
        temp  = ff[ff.length -1];
        console.log("what?");
      }
      this.setState( {
        lastFed : temp,
      });
      console.log(this.state.lastFed);
    
    if (this.state.placedfish.length == 0) {
      this.setState({
        popText: "You don't have any fish in your aquarium!",
      });
      this.togglePopup();
    }
    else if (this.state.lastFed == 0){
      post("/api/feedfish");
      this.setState({
        popText: "Yay! You have fed your fish.",
        releasedHeart: true,
      });
      this.togglePopup();
    }
    else if (Date.now() - Date.parse(this.state.lastFed.lastfed) > 82800000){
      post("/api/feedfish");
      this.setState({
        popText: "Yay! You have fed your fish.",
        releasedHeart: true,
      });
      this.togglePopup();
    }
    else {
      this.togglePopup();
      this.setState({
        popText: "You have already fed your fish in the last 23 hours.",
      });
    }
  });
  }


  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
    console.log("toggled");
  }


  pickingFish = () => {
    this.setState({
      pickFish: !this.state.pickFish
    });
    
  }

  soldFish = (fish) => {
    let ind = this.state.placedfish.indexOf(fish);
    this.state.placedfish.splice(ind, 1);
    this.setState ({
      placedfish : this.state.placedfish,
    });
  }

  killFish = () => {
    console.log("we made it.");
    var f;
    for (f = 0; f < this.state.deadFish.length; f++) {
      const body = {type: this.state.deadFish[f].type, googleid: this.state.gId};
      post("/api/deadFish", body).then(res => console.log(res));
      console.log('fish died');
      post("/api/killFish", body).then(res => console.log(res));
      console.log('recorded in db AKA dont show popup again pls');
    }
    this.setState({
      fishDie: false,
    });
    var temp = this.state.placedfish;
    temp.splice(0, this.state.deadFish.length);
    this.setState({
      placedfish : temp,
    });
  }

  fishDieToggle = () => {
    this.setState({
      fishDie : !this.state.fishDie,
      
    });
    console.log(this.state.fishDie);
  }

  closeFishDiePopup = () => {
    this.setState({
      fishDie : !this.state.fishDie,
    });
    this.killFish();
  }



  addingFish = (newfish) => {
    const ind = this.state.notplaced.indexOf(newfish);
    var temp = this.state.notplaced;
    temp.splice(ind, 1);
    this.setState({
      placedfish: this.state.placedfish.concat(newfish),
      notplaced: temp,
    });
    const body = { type: newfish.type , price: newfish.price, googleid: this.state.gId};
    post("/api/placefish", body).then(res => console.log(res));
    //need to delete from notplacedfish
    post("/api/removefish", body).then(res => console.log(res));
    console.log('addedfish');
    // this.pickingFish;
  }

  addAllFish = () => {
    var f;
    for (f = 0; f < this.state.notplaced.length; f++){
      let currentFish = this.state.notplaced[f];
      const body = { type: currentFish.type , price: currentFish.price, googleid: this.state.gId};
      post("/api/placefish", body).then(res => console.log(res));
      post("/api/removefish", body).then(res => console.log(res));
      console.log('addedfish')
    }
    this.setState({
      placedfish: this.state.placedfish.concat(this.state.notplaced),
      notplaced: [],
    });
  }

  boughtFish = (newfish) => {
    this.setState({
      notplaced: this.state.notplaced.concat(newfish),
    })
  }

  closeTour = () => {
    this.setState({
      isTourOpen: false,
    })
    if (!this.state.completedTutorial){
      const body = {googleid: this.state.gId};
      post("/api/tutorial", body).then(res => console.log(res));
      this.setState({
        completedTutorial: true,
      })
      console.log("i did the tutorial")
    }
  };

  openTour = () => {
    this.setState({
      isTourOpen: true
    });
  };

  /**
   * return an image
   */
  displayFish = (fishname) => {
    // TODO: refactor using switch 
    //console.log(fishname);
    if (fishname == 'doryfish') {
      //console.log('heLLOOOOo');
      return doryfish;
    }
    else if (fishname == 'blueyellowfish') {
      return byfish;
    }
    else if (fishname == 'greenyellowpuffer') {
      return gyp;
    }
    else if (fishname == 'patchyfish') {
      return patch;
    }
    else if (fishname == 'peachpuffer') {
      return peach;
    }
    else if (fishname == 'pinkfish') {
      return pink;
    }
    else if (fishname == 'purplepeachfish') {
      return purplepeach;
    }
    else if (fishname == 'clownfish') {
      return cfish;
    }
    else if (fishname == 'yellowfish') {
      return yfish;
    }
    else if (fishname == 'algae'){
      return algae;
    }
    else if (fishname == 'multicolorfish'){
      return mcfish;
    }
    else if (fishname == 'plankton'){
      return plankton;
    }
    else if (fishname == 'purplepatternedfish'){
      return ppfish;
    }
    else if (fishname == 'shrimp'){
      return shrimp;
    }
    else if (fishname == 'stripedfish') {
      return striped;
    }
    else if (fishname == 'turtle'){
      return turtle;
    }
    else if (fishname == 'octopus'){
      return octopus;
    }
    else if (fishname == 'seahorse') {
      return seahorse;
    }
  }

  render() {
    
    return (
      <>
      {!this.state.userId ?
        <Login handleLogin = {this.handleLogin}/> : 
        
      (this.state.completedTutorial=='null' || this.state.isTourOpen=='null') ? <p>loading</p> : 
      <>
        <Tour
          steps={steps}
          isOpen={this.state.isTourOpen}
          onRequestClose={this.closeTour} 
          />
          <div className="App-container">
          <NavBar
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <button onClick={this.openTour}>Tour</button>
          <Router>
            <Aquarium
              path="/"
              fishList={this.state.placedfish}
              checkifFed={this.checkifFed}
              pickingFish = {this.pickingFish}
              showPopup = {this.state.showPopup}
              popText = {this.state.popText}
              togglePopup = {this.togglePopup}
              pickFish = {this.state.pickFish}
              notplaced = {this.state.notplaced}
              addingFish = {this.addingFish}
              displayFish = {this.displayFish}
              releasedHeart = {this.state.releasedHeart}
              addAllFish = {this.addAllFish}
              fishDie = {this.state.fishDie}
              killFish = {this.killFish}
              fishDieToggle = {this.fishDieToggle}
              deadFish = {this.state.deadFish}
              closeFishDiePopup = {this.closeFishDiePopup}
              />
            <Habits
              path="/habits"
              fishList={this.state.placedfish}
              displayFish = {this.displayFish}
            />
            <Store
              path="/store"
              boughtFish = {this.boughtFish}
              displayFish = {this.displayFish}
              fishList={this.state.placedfish}
              togglePopup = {this.togglePopup}
              />
            <Inventory
              path="/inventory"
              fishList = {this.state.placedfish}
              displayFish = {this.displayFish}
              gId = {this.state.gId}
              soldFish = {this.soldFish}
              />
            <NotFound default />
          </Router> 
          <div className="signature">
            made with love (and lots of fish) by Claire, Andrea, and Cindy
          </div>
        </div>
        </>
          }
        
        </>
      

      
    )
}

}
export default App;
