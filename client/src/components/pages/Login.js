import React, { Component } from "react";

import "../../utilities.css";
import "./Login.css";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = "707474204069-ibaig6vr8u2gf995465eel35t6kf6u1r.apps.googleusercontent.com";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return ( <>
        <div className="logo-container">
            <div className="logo">
                Welcome to your Habit Aquarium.
            </div>
            <div className="description">
                Add new habit goals and maintain them. Each time you check off completion of a habit, you receive currency to buy items to fill up your aquarium!
            </div>
            <div className="login-button">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
            />
            </div>
        </div>
        </>
        );
    }

}

export default Login;