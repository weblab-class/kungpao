import React from "react";
import ChatBot from "../../third_party/chatbot/ChatBot";
import { get, post } from "../../utilities";
import ray from "../data/raypfp.jpg";



function CustomChatbot(props) {
    console.log(props)
    const config = {
      width: "100%",
      height: "65vh",
      botAvatar: ray,
      handleEnd: (response) => {
        if(response.values[0]!=='No'){
          const body = { type: response.values[0].type, price: response.values[0].price };
          post("/api/buyfish", body).then(res => console.log(res));
          console.log('good')
          props.boughtFish(body);

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
        trigger: props.money > f.price ? "Done" : "poor"
      }
    })
   fishOfferings.push({ 
        value: "No",
        label: "No",
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
         message: "You don't have enough money to purchase this fish",
       },
      {
       id: "Done",
       message: "Have a great day !!",
       trigger: "confirm"
      },{
        id: "confirm",
        end: true,
        options: [{
          value: "confirm purchase",
          trigger: "Greet",
          label: "confirm purchase"
        }]
      }
    ];
  return <ChatBot steps={steps} {...config} />;
}
export default CustomChatbot;