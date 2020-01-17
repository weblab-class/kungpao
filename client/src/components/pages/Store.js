import React, { Component } from "react";
import SingleMessage from "../modules/SingleMessage.js";
import { get, post } from "../../utilities";


import "../../utilities.css";
import "./Store.css";
//import { get } from "mongoose";

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fishtoday: [],
        }
        
    }

    componentDidMount(){
        console.log('yay');
        get("/api/todaysfish").then((res) => {
            this.setState({
              fishtoday: res,
            });
          });
          
    }

    populateFishToday(){
        
      }

    render() {
        return ( 
        <div>
            <div className="ChatContainer">
            Buy stuff with sand dollars.
            <button
            type="submit"
            className="Chat-button u-pointer"
            value="Submit"
            onClick={console.log("hi i'm a button")}
            >
                fish food
            </button>
            <div>
                <SingleMessage fishtoday={this.state.fishtoday}/>
            </div>

            </div>
            
            
        </div>
            
        );
    }

}

export default Store;