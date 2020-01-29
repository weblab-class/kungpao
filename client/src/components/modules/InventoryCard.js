import React, { Component } from "react";
import { get, post } from "../../utilities";

import "./InventoryCard.css";

class InventoryCard extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();
};


  render() {
    return (
            <div onClick={() => this.props.clickFx(this.props.fish)} className="InventoryCard square u-pointer">
                <div className="content u-textCenter u-pointer">
                    <img src={this.props.displayFish(this.props.fish.type)} width="100%" >
                    </img>
                    <div className="InventoryCard-title">
                        <div className="InventoryCard-name">
                            {this.props.fish.name}
                        </div>
                        
                        <div className="InventoryCard-price">
                            {this.props.fish.price}
                        </div>
                    </div>
                
                </div>    
            </div>
    );
  }
}

export default InventoryCard;