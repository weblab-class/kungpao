import React from "react";
import ChatBot from "../../third_party/chatbot/ChatBot";
import { get, post } from "../../utilities";
import ray from "../data/raypfp.jpg";



function CustomChatbot(props) {
    console.log(props)
    const config = {
      width: "100%",
      height: "100%",
      botAvatar: ray,
      handleEnd: (response) => {
        const body = { type: response.values[0] };
        post("/api/buyfish", body).then(res => console.log(res));
        console.log('good')
        props.boughtFish(body);
      }
      // cache: true
      // height: "400px",
      // floating: true
    };

    const fishOfferings = props.fish.map((f,i) => {
      return {
        value: f.type,
        label: f.name + "$#$" + "$" + f.price + "$#$"+props.displayFish(f.type),
        trigger: "Done"
      }
    })
   fishOfferings.push({ 
        value: "false",
        label: "No",
        trigger: "Done"
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
       id: "Done",
       message: "Have a great day !!",
       trigger: "reoffer"
      },{
        id: "reoffer",
        end: true,
        options: [{
          "value": "buyanotherfish",
          trigger: "Greet",
          label: "buy another fish"
        }]
      }
    ];
  return <ChatBot steps={steps} {...config} />;
}
export default CustomChatbot;