import React, { Component } from "react";

import "../../utilities.css";
import Fish from "../modules/Fish.js";
import InventoryCard from "../modules/InventoryCard.js";


class Inventory extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return ( <>
        {this.props.fishList.map((f) => (<>
            <div>
              <Fish image={this.props.displayFish(f.type)}/>
              </div>
              
              </>
            ))}
            <div className="FishCardGroup">
            
            {this.props.fishList.map((f) => (<>
                <div>
                  <InventoryCard displayFish={this.props.displayFish} fish={f}/>
                  </div>
              </>
            ))}
            
            </div>
        
            </>
        );
    }

}

export default Inventory;