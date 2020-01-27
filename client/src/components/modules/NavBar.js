import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";


// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "707474204069-ibaig6vr8u2gf995465eel35t6kf6u1r.apps.googleusercontent.com";
const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      
      return {
        style: {
        textShadow: isCurrent ? "0.5px 0.5px 0 white" : "none",
        paddingLeft: isCurrent ? "15px" : "0px"
        }
      };
    }}
  />
);
/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    return (
      <>
      <div className="NavBar-container">
      <div className="NavBar-sidebar">
          <div className="menu-item">
          <NavLink to="/" className="NavBar-link">
            Aquarium
          </NavLink>
          </div>
          <div className="menu-item">
          <NavLink to="/habits" className="NavBar-link">
            Habits
          </NavLink>
          </div>
          <div className="menu-item">
          <NavLink to="/store" className="NavBar-link">
            Store
          </NavLink>
          </div>
          <div className="menu-item">
          <NavLink to="/inventory" className="NavBar-link">
            Inventory
          </NavLink>
          </div>
          <div className="menu-item">
            <a className="NavBar-link">Logout</a>
          </div>
        </div>
        <div className="NavBar-title-container">
          <div className="NavBar-title">
              Habit Aquarium
          </div>
        </div>
        <div className="logout-button">
        {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}

        </div>
        
      </div>
      </>
    );
  }
}

export default NavBar;