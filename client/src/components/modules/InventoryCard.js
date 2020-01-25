import React, { Component } from "react";
import { get, post } from "../../utilities";


class InventoryCard extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log('The fish was clicked.');
};


  render() {
    return (

            <div className="FishCard square u-pointer">
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

export default InventoryCard;