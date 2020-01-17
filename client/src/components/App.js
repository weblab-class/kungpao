import React, { Component } from "react";
import { Router } from "@reach/router";
import NavBar from "./modules/Navbar.js"
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Aquarium from "./pages/Aquarium.js";
import Habits from "./pages/Habits.js";
import Store from "./pages/Store.js";
import Popup from "./modules/Popup.js";
import FishPopup from "./modules/FishPopup.js";
import Login from "./pages/Login.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

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
      showPopup: false,
      popText: "",
      pickFish: false,
      fish: [],
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id, gId: user.googleid});
        
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
    this.setState({
      fish: this.state.fish.concat([newfish]),
    });  
    console.log("BIIGIDSIFD");
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
            fishList={this.state.fish}
            checkifFed={this.checkifFed}
            pickingFish = {this.pickingFish}
            />
          <Habits
            path="/habits"
          />
          <Store
            path="/store"
            />
          <NotFound default />
        </Router> 
        {this.state.showPopup ? <Popup popText={this.state.popText}
          onClose={this.togglePopup}>
        </Popup> : null}
        {this.state.pickFish ? <FishPopup onClose={this.pickingFish} addingFish ={byfish => this.addingFish(byfish)}></FishPopup> : null}
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
