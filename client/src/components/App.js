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
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

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

        
        </div>
      </>
    );
  }
}

export default App;
