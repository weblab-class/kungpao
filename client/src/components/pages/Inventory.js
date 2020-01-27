import React, { Component } from "react";

import "../../utilities.css";
import Fish from "../modules/Fish.js";
import InventoryCard from "../modules/InventoryCard.js";
import { get, post } from "../../utilities";

import "./Inventory.css";

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected : [],
            inventoryList : [],
            switched : false,
            selectedTotal : 0,
        };
    }

    componentDidMount(){
    }

    addToSelect = (fish) => {
        if (this.state.switched) {
            console.log('p2');
            var temp = this.state.inventoryList;
            console.log(temp);
            console.log(fish);
            let ind = this.state.inventoryList.indexOf(fish);
            console.log(ind);
            temp.splice(ind, 1);
            this.setState({
                selected : this.state.selected.concat(fish),
                inventoryList : temp,
                selectedTotal : this.state.selectedTotal + fish.price,
            });
        }
        else {
            console.log('p1');
            console.log(fish);
            var temp = this.props.fishList.slice();
            let ind = this.props.fishList.indexOf(fish);
            temp.splice(ind, 1);
            console.log(ind);
            this.setState({
                selected : this.state.selected.concat(fish),
                inventoryList : temp,
                switched: true,
                selectedTotal : this.state.selectedTotal + fish.price,
            })
        }  
    }

    removeFromSelect = (fish) => {
        if (this.state.switched) {
            var temp = this.state.selected;
            let ind = this.state.selected.indexOf(fish);
            temp.splice(ind, 1);
            this.setState({
                selected : temp,
                inventoryList : this.state.inventoryList.concat(fish),
                selectedTotal : this.state.selectedTotal - fish.price,
            });
        }
        else {
            var temp = this.state.selected;
            let ind = this.state.selected.indexOf(fish);
            temp.splice(ind, 1);
            this.setState({
                selected : temp,
                inventoryList : this.props.fishList.concat(fish),
                switched: true,
                selectedTotal : this.state.selectedTotal - fish.price,
            });
        }
        
    }

    sellingFish = () => {
        var f;
        for (f = 0; f < this.state.selected.length; f++){
            console.log(this.state.selected[f]);
            const body = {type: this.state.selected[f].type, googleid: this.props.gId};
            post("/api/deadFish", body).then(res => console.log(res));
            this.props.soldFish(this.state.selected[f]);
            console.log('sold fish');
        }
        post("/api/incrementMoney", {amount: this.state.selectedTotal}).then((money) => {
            console.log("increase money " + money);
        });
        this.setState({
            selected : [],
            selectedTotal : 0,
        });
        
    }

    render() {
        return ( <>
        {this.props.fishList.map((f) => (<>
            <div>
              <Fish image={this.props.displayFish(f.type)}/>
              </div>
              
              </>
            ))}
        <div className="Inventory-container">
            <div className="fishGroup">
            <div className="InventoryCardGroup">
            
            {this.state.switched ? (
                this.state.inventoryList.length == 0 ? 
                <div className="no-fish">You don't have any fish!</div> :
                this.state.inventoryList.map((f) => (<>
                    <div>
                      <InventoryCard displayFish={this.props.displayFish} fish={f} clickFx={f => this.addToSelect(f)}/>
                      </div>
                  </>
                ))
            )
             : 
             (this.props.fishList.length == 0 ? <div className="no-fish">You don't have any fish!</div> :
            this.props.fishList.map((f) => (<>
                <div>
                  <InventoryCard displayFish={this.props.displayFish} fish={f} clickFx={f => this.addToSelect(f)}/>
                  </div>
              </>
            ))
             )
            }
            
            </div>
            </div>
            <div className="Inventory-selling-container">
                <div className="Inventory-selling-text">
                    Although we all love and adore our fish, we understand that sometimes too many is too many. Select any fish you want to sell back to Ray, and click on any fish in the box below to cancel the selection.
                </div>
                <button onClick={this.sellingFish} className="Inventory-sell-button">Sell Selected</button>
                <div className="Inventory-selected-balance">
                <p>Selected Balance: {this.state.selectedTotal}</p>
                </div>
                <div className="Inventory-selling-selected">
                    <div className="InventoryCardGroup">
                    
                        {this.state.selected.length == 0 ? <div className="none-selected">No fish selected</div> : 
                        this.state.selected.map((f) => (
                            <>
                            <div>
                                <InventoryCard displayFish={this.props.displayFish} fish={f} clickFx={f => this.removeFromSelect(f)}/>
                            </div>
                        </>
                        ))
                        }
                    </div>
                </div>
            </div>
            
        </div>
        
            </>
        );
    }

}

export default Inventory;