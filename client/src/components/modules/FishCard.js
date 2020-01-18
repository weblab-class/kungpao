import React, { Component } from "react";
import doryfish from "../data/doryfish.png";
import blueyellowfish from "../data/blueyellowfish.png";
import purplecoral from "../data/purplecoral.png";
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
    const body = { type: this.props.fish.type };
    post("/api/buyfish", body).then(res => console.log(res));
    console.log('good')
    this.props.boughtFish(body);
  };

  render() {
    return (
      <div onClick={this.buyFish} className="FishCard square u-pointer">
        <div className="content u-textCenter u-pointer">
          <img src={this.props.displayFish(this.props.fish.type)} width="100%" >
          </img>
          <div className="FishCard-title">
          <span className="FishCard-name">
            {this.props.fish.name}
          </span>
          
          <span className="FishCard-price">
            {this.props.fish.price}
          </span>
          </div>
          
        </div>    
      </div>
    );
  }
}

export default FishCard;
