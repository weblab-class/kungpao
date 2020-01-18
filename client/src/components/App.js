import React, { Component } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/NavBar.js"
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Aquarium from "./pages/Aquarium.js";
import Habits from "./pages/Habits.js";
import Store from "./pages/Store.js";
import Popup from "./modules/Popup.js";
import FishPopup from "./modules/FishPopup.js";
import Login from "./pages/Login.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = "707474204069-ibaig6vr8u2gf995465eel35t6kf6u1r.apps.googleusercontent.com";

import "./App.css";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

import doryfish from "./data/doryfish.png";
import byfish from "./data/blueyellowfish.png";
import purplecoral from "./data/purplecoral.png";
import cfish from "./data/clownfish.png";
import gyp from "./data/greenyellowpuffer.png";
import patch from "./data/patchyfish.png";
import peach from "./data/peachpuffer.png";
import pink from "./data/pinkfish.png";
import purplepeach from "./data/purplepeachfish.png";
import seaweed from "./data/seaweed.png";
import yfish from "./data/yellowfish.png";

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
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id, gId: user.googleid});
        get("/api/buyfish", {googleid: user.googleid}).then((f) => {
          this.setState({notplaced : f});
          console.log(this.state.notplaced);
          console.log(this.state.notplaced[0]);
        });
        get("/api/placefish", {googleid: user.googleid}).then((f) => {
          this.setState({placedfish : f});
          console.log("placedfish");
          console.log(this.state.placedfish);
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
      get("/api/placefish", {googleid: user.googleid}).then((f) => {
        this.setState({placedfish : f});
      });
      get("api/money").then((money) => {
        if (money.length === 0) {
          console.log("creating money");
          post("api/createMoney").then((money) => {
            console.log(money);
          });
        }
      })
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };
  checkifFed = () => {
    console.log(this.state.gId);
    get("/api/feedfish", {googleid: this.state.gId}).then((ff) => {
      this.setState( {
        lastFed : ff,
      });
    if (this.state.lastFed.length == 0){
      post("/api/feedfish");
      this.togglePopup();
      this.setState({
        popText: "Yay! You have fed your fish.",
      });
    }
    else if (Date.now() - this.state.lastFed[this.state.lastFed.length -1].lastfed > 86400000){
      post("/api/feedfish");
      this.togglePopup();
      this.setState({
        popText: "Yay! You have fed your fish.",
      });
    }
    else {
      console.log("You already fed your fish less than 24 hours ago!");
      this.togglePopup();
      this.setState({
        popText: "You have already fed your fish in the last 24 hours.",
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

  addingFish = (newfish) => {
    const ind = this.state.notplaced.indexOf(newfish);
    var temp = this.state.notplaced;
    temp.splice(ind, 1);
    this.setState({
      placedfish: this.state.placedfish.concat(newfish),
      notplaced: temp,
    });
    const body = { type: newfish.type , googleid: this.state.gId};
    post("/api/placefish", body).then(res => console.log(res));
    //need to delete from notplacedfish
    post("/api/removefish", body).then(res => console.log(res));
    console.log('addedfish')
  }

  boughtFish = (newfish) => {
    this.setState({
      notplaced: this.state.notplaced.concat(newfish),
    })
  }

  displayFish = (fishname) => {
    console.log(fishname);
    if (fishname == 'doryfish') {
      console.log('heLLOOOOo');
      return doryfish;
    }
    else if (fishname == 'blueyellowfish') {
      return byfish;
    }
    else if (fishname == 'purplecoral') {
      return purplecoral;
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
    else if (fishname == 'seaweed') {
      return seaweed;
    }
  }

  render() {
    
    return (
      <>
      {this.state.userId ?
      <>
      <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <div className="App-container">
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
            />
          <Habits
            path="/habits"
          />
          <Store
            path="/store"
            boughtFish = {this.boughtFish}
            displayFish = {this.displayFish}
            />
          <NotFound default />
        </Router> 
        {/* {this.state.showPopup ? <Popup popText={this.state.popText}
          onClose={this.togglePopup}>
        </Popup> : null}
        {this.state.pickFish ? <FishPopup onClose={this.pickingFish} availFish = {this.state.notplaced} addingFish ={byfish => this.addingFish(byfish)}></FishPopup> : null} */}
        </div>
        </>
        
        : 
        <>
        <Login handleLogin = {this.handleLogin}/>
        
</>
      }
        
        </>
    );
  }
}

export default App;
