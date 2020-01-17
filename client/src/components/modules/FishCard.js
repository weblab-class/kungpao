import React, { Component } from "react";
import doryfish from "../data/doryfish.png"
import { get, post } from "../../utilities";

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

  handleClick = (e) => {
    e.preventDefault();
    console.log('The link was clicked.');
};

  buyFish = (value) => {
    const body = { type: this.props.type };
    post("/api/buyfish", body).then(res => console.log(res));
    console.log('good')
  };

  render() {
    return (
      <div onClick={this.buyFish} className="FishCard square u-pointer">
        <div className="content u-textCenter u-pointer">
          <img src={doryfish} width="100%" >
          </img>
          <div className="FishCard-title">
          <span className="FishCard-name">
            dory
          </span>
          
          <span className="FishCard-price">
            25
          </span>
          </div>
          
        </div>    
      </div>
    );
  }
}

export default FishCard;
