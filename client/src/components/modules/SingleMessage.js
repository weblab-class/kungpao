import React, { Component } from "react";
import FishCard from "./FishCard.js";

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
    }

    render() {
        return (
          <div className="SingleMessage-container">
              <FishCard></FishCard>
          </div>
        );
    }
}
    
export default SingleMessage;