import React, { Component } from "react";
import SingleMessage from "../modules/SingleMessage.js";
import { get, post } from "../../utilities";
import { Link } from "@reach/router";
import {css} from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";
import StorePopup from "../modules/StorePopup.js";


import "../../utilities.css";
import "./Store.css";
import CustomChatbot from "../modules/CustomChatbot.js";
import Fish from "../modules/Fish.js";
import { createHistory } from "@reach/router";

//import { get } from "mongoose";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fishtoday: [],
            money: -1,
            messages: [],
            name: "#@!",
          random: Math.random(),
          conversationRestartEligible: false,
          showChat: true,
          showStorePopup: false,
        }
        this.changeMoney = this.changeMoney.bind(this);
        this.changeName = this.changeName.bind(this);
      this.endConversation = this.endConversation.bind(this);
      this.restartConversation = this.restartConversation.bind(this);
    }

    // loadMessageHistory(value) {
    //     get("/api/chat").then((messages) => {
    //       this.setState({
    //         messages : messages,
    //       });
    //     });
    //   }

    componentDidMount(){
        console.log('yay');
        get("/api/todaysfish").then((res) => {
            this.setState({
              fishtoday: res,
            });
          });
        // this.loadMessageHistory();

        get("/api/money").then((res) => {
            if(typeof res.money==='undefined' || res.money==null){
                console.log('zeromoneytostart');
                const body = { money: 0};
                post("/api/money", body).then((f)=> console.log(f));
                this.setState({
                  money: 0,
                });
            } else {
                console.log('ihadmoneybefore??');
                this.setState({
                  money: res.money,
                });
            };   
        });
        get("/api/name").then((res) => {
          if(typeof res.name=='undefined' || res.name==null){
              console.log('nonameyet');
              const body = { name: null};
              post("/api/name", body).then((f)=> console.log(f));
              this.setState({
                name: null,
              });
          } else {
              console.log('theresaname');
              console.log('mynameis' + res.name);
              this.setState({
                name: res.name,
              });
          };   
      });
          
    }

    changeMoney(price, previousmoney){
      
      post("/api/incrementMoney", {amount: -price}).then((money) => {
        console.log("lose money " + money);
        this.setState({
          money: this.state.money - price,
        });
    });
    }

  endConversation() {
      this.setState({
        conversationRestartEligible: true
      })
  }

  toggleStorePopup = () => {
    this.setState({
      showStorePopup : !this.state.showStorePopup
    })
  }

  restartConversation() {
      this.setState({
        random: Math.random(),
        showChat: false
      })
    const contextThis = this;
    setTimeout(() => {
      contextThis.setState({
        showChat: true,
        conversationRestartEligible: false
      })
    }, 500)
  }

    changeName(name){
      post("/api/name", {name: name}).then((name)=>{
        console.log("setName!");
        this.setState({
          name: name,
        });
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
        //     
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
      <div className="popup-holder">
        {(this.state.conversationRestartEligible ? (
          <StorePopup popText="Return to your Aquarium or talk to Ray again!"
          onCloseP={this.toggleStorePopup} restart={this.restartConversation} ></StorePopup>
          
          
          // console.log("hello?")
          // <a href="#" onClick={this.restartConversation} className="return-button">Talk to Ray again</a>
        ) : null)}
        </div>

      {/* {this.state.showStorePopup ? <StorePopup popText="Return to your Aquarium or talk to Ray again!"
          onCloseP={this.toggleStorePopup}></StorePopup> : null} */}
        <div className = "Money">
          {this.state.money}

        </div>
        <div className="ChatContainer" style={{"padding-top": "60px"}}>
          {(this.state.fishtoday.length > 0 && this.state.money > -1 && this.state.name != "#@!" && this.state.showChat) ?
            <CustomChatbot name={this.state.name}
                           changeName={this.changeName}
                           displayFish={this.props.displayFish}
                           changeMoney = {this.changeMoney}
                           fish={this.state.fishtoday}
                           boughtFish={this.props.boughtFish}
                           money={this.state.money}
                           randomState={this.state.random} // Adding a random state to force refresh when needed
                           endConversationCallback={this.endConversation}
            /> : 
            <CircleLoader
              css={override}
                size={150}
                color={"white"}
              />
        }</div>
          {this.props.fishList.map((f, i) => (
            <Fish key={i} image={this.props.displayFish(f.type)}/>
          ))}

          
      </>
            
        );
    }

}

export default Store;