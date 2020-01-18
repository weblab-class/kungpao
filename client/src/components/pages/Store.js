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
            money: 0,
        }
        
    }

    componentDidMount(){
        console.log('yay');
        get("/api/todaysfish").then((res) => {
            this.setState({
              fishtoday: res,
            });
          });

        get("/api/money").then((res) => {
            if(typeof res==='undefined'){
                console.log('ihavemoney');
                const body = { money: 0};
                post("/api/money", body).then((f)=> console.log(f));
            } else {
                console.log('nomoney');
                // this.setState({
                    
                //     money: res.money,
                // });

            };
            
                
        });
          
    }

    populateFishToday(){
        
      }

    render() {
        return ( 
        <div>
            <div className = "Money">
                {this.state.money}

            </div>
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