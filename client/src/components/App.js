import React, { Component } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/Navbar.js"
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Aquarium from "./pages/Aquarium.js";
import Habits from "./pages/Habits.js";
import Store from "./pages/Store.js";

import "./App.css";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";



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
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
        
      }
    });
    
    
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id, gId: user.googleid, });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  feedFish = () => {
    console.log(Date.now())

    this.checkifFed().then((y) => {
      console.log(this.state.lastFed)
    if (this.state.lastFed.length == 0){
      console.log("Feeding!");
      post("/api/feedfish");
    }
    else if (Date.now() - this.state.lastFed[0].lastfed > 86400000){
      console.log("Feeding...");
      post("/api/feedfish");
    }
    else {
      console.log("You already fed your fish less than 24 hours ago!")
    }
    })
  };

  checkifFed = () => {
    get("/api/feedfish", {googleid: this.state.gId}).then((ff) => {
      console.log("Retrieving...");
      console.log(this.state.gId);
      this.setState( {
        lastFed : ff,
      });
      console.log(Date.now())
      console.log(this.state.lastFed)
      // console.log(this.state.lastFed[0].lastfed)
      console.log(this.state.lastFed.length)
    if (this.state.lastFed.length == 0){
      console.log("Feeding!");
      post("/api/feedfish");
    }
    else if (Date.now() - this.state.lastFed[this.state.lastFed.length -1].lastfed > 86400000){
      console.log("Feeding...");
      post("/api/feedfish");
    }
    else {
      console.log(Date.now() - Date.parse(this.state.lastFed[this.state.lastFed.length-1].lastfed))
      console.log("You already fed your fish less than 24 hours ago!")
    }
    });
  }

  render() {
    
    return (
      
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <div className="App-container">
        <Router>
          <Skeleton
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <Aquarium
            path="/aquarium"
            />
          <Habits
            path="/habits"
          />
          <Store
            path="/store"
            />
          <NotFound default />
        </Router>
        <button onClick={this.checkifFed}> Feed fish</button>
        <button>Place Items</button>
        
        </div>
      </>
    );
  }
}

export default App;
