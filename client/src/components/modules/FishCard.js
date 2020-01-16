import React, { Component } from "react";
import doryfish from "../data/doryfish.png"

import "./FishCard.css";

/**
 * Renders a single card in store of fish or fish-like item.
 *
 * Proptypes
 * @param {MessageObject} message
 */
class FishCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="FishCard square">
        <div className="content u-textCenter">
          <img src={doryfish} width="100%">
          </img>
          i'm a fish
        </div>    
      </div>
    );
  }
}

export default FishCard;
