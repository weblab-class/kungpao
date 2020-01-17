import React, { Component } from "react";
import FishCard from "./FishCard.js";
import Response from "./Response.js";

import "./SingleMessage.css";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {MessageObject} message
 */
class SingleMessage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        responses: ["fish1", "fish2"],
      }
    }

    render() {
        return (
          <div className="SingleMessage-container">
            <FishCard fish = {this.props.fishtoday[0]}/>
            <div className="FishCardGroup">
              <div>
              <FishCard fish = {this.props.fishtoday[0]}/>
              </div>
              
              <FishCard fish = {this.props.fishtoday[1]}/>
              <FishCard fish = {this.props.fishtoday[2]}/>

            </div>
            <div className="Response-container">
              {this.state.responses.map((r, i) => (
                <Response response={r} key={i} />
              ))}

            </div>
            
              
          </div>
        );
    }
}
    
export default SingleMessage;