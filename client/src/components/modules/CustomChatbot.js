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
        if(confirmIndex!==-1){
          const purchasedfish = response.values[confirmIndex-1];
          
          const body = { type: purchasedfish.type };
          
          post("/api/buyfish", body).then(res => console.log(res));
          console.log('yay' + purchasedfish.price)
          props.boughtFish(body);
          props.changeMoney(purchasedfish.price, props.money);

        }
        
      }
      // cache: true
      // height: "400px",
      // floating: true
    };

    const fishOfferings = props.fish.map((f,i) => {
      return {
        value: f,
        label: f.name + "$#$" + "$" + f.price + "$#$"+props.displayFish(f.type),
        trigger: props.money >= f.price ? "sure?" : "poor"
      }
    })
   fishOfferings.push({ 
        value: "No",
        label: "No thanks",
        trigger: "none",
      } )
  const steps = [
      {
       id: "Greet",
       message: "Hi I'm Ray and I own the fish store! ",
       trigger: "offer"
      },
      {
       id: "offer",
       message: "Here's what we have today:",
       trigger: "fish"
      },
      {
        id: "reoffer",
        message: "Would you like anything else?",
        trigger: "offer",

      },
      {
        id: "fish",
        options: fishOfferings
      },
      {
        id: "none",
        message: "Have a great day !!",
        end: true,
       },
       {
         id: "poor",
         message: "You don't have enough money to purchase this fish! Why don't you get a different one?",
         trigger: "offer",
       },
      {
       id: "Done",
       message: "Have a great day !!",
       end: true,
      },
      {
        id: "sure?",
        message: "Are you sure?",
        trigger: "confirm",
      },
      {
        id: "confirm",
        options: [{
          value: "confirm",
          trigger: "Done",
          label: "confirm purchase",
        },
        {
          value: "No",
          trigger: "reoffer",
          label: "cancel",

        }]
      }
    ];
  return <ChatBot steps={steps} {...config} />;
}
export default CustomChatbot;