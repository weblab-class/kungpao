import React, { Component } from "react";
import SingleMessage from "../modules/SingleMessage.js";
import { get, post } from "../../utilities";


import "../../utilities.css";
import "./Store.css";
import CustomChatbot from "../modules/CustomChatbot.js";
import Fish from "../modules/Fish.js";

//import { get } from "mongoose";

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fishtoday: [],
            money: 0,
            messages: [],

        }
    }

    loadMessageHistory(value) {
        get("/api/chat").then((messages) => {
          this.setState({
            messages : messages,
          });
        });
      }

    componentDidMount(){
        console.log('yay');
        get("/api/todaysfish").then((res) => {
            this.setState({
              fishtoday: res,
            });
          });
        this.loadMessageHistory();

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


    addMessage(data){//work in progress
        this.setState((prevstate) => ({
            messages: prevstate.activeChat.messages.concat(data),
            
          }));
        
      }
    
    sendMessage = (value) => {
        const body = { recipient: this.props.recipient, content: value };
        post("/api/message", body);
    };

    render() {
        return ( 
        // <div>
        //     <div className = "Money">
        //         {this.state.money}

        //     </div>
        //     <div className="ChatContainer">
        //     Buy stuff with sand dollars.
        //     <button
        //     type="submit"
        //     className="Chat-button u-pointer"
        //     value="Submit"
        //     onClick={console.log("hi i'm a button")}
        //     >
        //         fish food
        //     </button>
        //     <div>
        //         <SingleMessage fishtoday={this.state.fishtoday} boughtFish={this.props.boughtFish} displayFish = {this.props.displayFish}/>
        //     </div>

            

        //     </div>
            
            
        // </div>
        <>
        <div className="ChatContainer">
        {this.state.fishtoday.length > 0 ? <CustomChatbot displayFish={this.props.displayFish} fish={this.state.fishtoday} boughtFish={this.props.boughtFish}/> : <div/>}
        
      </div>
      {this.props.fishList.map((f) => (
        <Fish image={this.props.displayFish(f.type)}/>
      ))}
      </>
            
        );
    }

}

export default Store;