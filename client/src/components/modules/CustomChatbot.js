import React from "react";
import ChatBot from "../../third_party/chatbot/ChatBot";
import { get, post } from "../../utilities";
import ray from "../data/raypfp.jpg";
import { PromiseProvider } from "mongoose";



function CustomChatbot(props) {
    console.log(props)
    const config = {
      width: "100%",
      height: "65vh",
      botAvatar: ray,
      handleEnd: (response) => {
        const confirmIndex = response.values.indexOf("confirm");
        console.log(response.values[0]);
        //console.log(response.values);
        if(confirmIndex!==-1){
          const purchasedfish = response.values[confirmIndex-1];
          
          const body = { type: purchasedfish.type , price: purchasedfish.price};
          
          post("/api/buyfish", body).then(res => console.log(res));
          console.log('yay' + purchasedfish.price)
          props.boughtFish(body);
          props.changeMoney(purchasedfish.price, props.money);

        }
        if(props.name==null){
          props.changeName(response.values[0]);
        }
        props.endConversationCallback()
        
      }
      // cache: true
      // height: "400px",
      // floating: true
    };

    let myName = props.name;

    const fishOfferings = props.fish.map((f,i) => {
      return {
        value: f,
        label: f.name + "$#$" + ": " + f.price + "$#$"+props.displayFish(f.type),
        trigger: props.money >= f.price ? "sure?" : "poor"
      }
    })
   fishOfferings.push({ 
        value: "No",
        label: "No thanks",
        trigger: "none",
        hideInput: true,
      } )
  const steps = [
      {
       id: "Greet",
       message: "Hi I'm Ray and I own the fish store! ",
       trigger: myName==null ? "firsttime":"offer",
       hideInput: true,
      },
      {
        id: "firsttime",
        message: "Oh you're new around here. What's your name?",
        trigger: "name",
      },
      {
        id: 'name',
        user: true,
        trigger: 'firsttimeoffer',
        hideInput: false
      },
      {
        id: "firsttimeoffer",
        message: "Here's what I've got, {previousValue}",
        trigger: 'fish',
      },
      {
        id: "firsttimereoffer",
        message: "Here's what we have today:",
        trigger: "fish",
      },
      {
       id: "offer",
       message: myName+", here's what I have for you today:",
       trigger: "fish",
       hideInput: true,
      },
      {
        id: "reoffer",
        message: "Would you like anything else?",
        trigger: "offer",
        hideInput: true,

      },
      {
        id: "fish",
        hideInput: true,
        options: fishOfferings,
        
      },
      {
        id: "none",
        message: myName==null ? "Have a great day!!":"Come back soon " +myName+"!",
        end: true,
        hideInput: true,
       },
       {
         id: "poor",
         message: "You don't have enough money to purchase this fish! Why don't you get a different one?",
         trigger: myName==null ? "firsttimereoffer":"offer",
         hideInput: true,
       },
      {
       id: "Done",
       message: "Confirmed! You can choose to place your fish in your aquarium right away by clicking 'Place Items' on the Aquarium tab, or save it for later.",
       end: true,
       //trigger: "buyanother",
      },
      // {
      //   id: "buyanother",
      //   options: [{
      //     value: "buyanother",
      //     trigger: myName==null ? "firsttimereoffer":"offer",
      //     label: "buy another fish",
      //     end: true,
      //   }],
      // },
      {
        id: "sure?",
        message: "Are you sure?",
        trigger: "confirm",
        hideInput: true,
      },
      {
        id: "confirm",
        hideInput: true,
        options: [{
          value: "confirm",
          trigger: "Done",
          label: "Confirm",
        },
        {
          value: "No",
          trigger: myName==null ? "firsttimereoffer":"reoffer",
          label: "Cancel",

        },
          // {
          //   label: "Unused state" + props.randomState,
          //   id: "unusedState"
          // }
        ]
      }
    ];
  return <ChatBot steps={steps} {...config} />;
}
export default CustomChatbot;