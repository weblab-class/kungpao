import React, { Component } from "react";

import "../../utilities.css";
import "./Aquarium.css";
import Fish from "../modules/Fish.js";

import bubble from "./bubble.png";
import Popup from "../modules/Popup.js";
import FishPopup from "../modules/FishPopup.js";

import purplecoral from "../data/purplecoral.png";
import seaweed from "../data/seaweed.png";
import heart from "./redheart.png";



class Aquarium extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.fishList);
        this.state = {
          releasedHeart : false,
        }

    }

    

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
      }
    
      handleResize() {
        this.setState({
          height: window.innerHeight,
          width: window.innerWidth
        })
      }


      setProperty = (item, mar) => {
        item.style.setProperty('--img-position', mar + 'px');
      }

      heartReleased = () => {
        this.setState({
          releasedHeart : true
        });
        console.log("heart released");
      }

      

      render() {
        // let pos = Math.random();
        // let pcoral = <img src={purplecoral} alt="coral"></img>
        // pcoral, pos => this.setProperty(pcoral, pos);
        // let pos2 = Math.random();
        // let sw = <img src={seaweed} alt="seaweed"></img>
        // sw, pos2 => this.setProperty(sw, pos2);

        return (
          <div>
            <div className="full-window">
            <div className="both-buttons">
              <div></div>
              <div></div>
              <div></div>
              <div className="button-container">
                <button onClick={this.props.pickFish ? this.props.pickingFish : this.props.checkifFed}
                   > Feed fish</button>
              </div>
              <div className="button-container">
                <button onClick={this.props.showPopup ? this.props.togglePopup : this.props.pickingFish}>Place Items</button>
              </div>
            
              </div>
            </div>

            {this.props.fishList.map((f) => (
              // f.type == "purplecoral" ? 
              //   <div className="ocean-decor">
              //   <img src={purplecoral} alt="coral"></img>
              //   {/* {pcoral} */}
              //   </div>
              // :
              // f.type == "seaweed" ?
              // <div className="ocean-decor">
              //   <img src={seaweed} alt="seaweed"></img>
              //   {/* {sw} */}
              //   </div>
              // :
              <Fish image={this.props.displayFish(f.type)}/>
            ))}

        {this.props.showPopup ? <Popup popText={this.props.popText}
          onCloseP={this.props.togglePopup}>
        </Popup> : null}
        {this.props.pickFish ? <FishPopup onCloseFP={this.props.pickingFish} availFish = {this.props.notplaced} addingFish ={byfish => this.props.addingFish(byfish)} displayFish = {this.props.displayFish}></FishPopup> : null}
            <div className='water' style={{ ...this.state, zIndex:-1 }}>
              <div className='bubble'>
                <img src={bubble} alt="bubble"></img>
              </div>
              {/* {this.props.popText == "Yay! You have fed your fish." ? (this.state.releasedHeart == false ? <div className="feed-heart">
                <img src={heart} alt="heart"></img> 
                {this.heartReleased}
              </div> : null) : null} */}
            </div>
          </div>
        );
      }
    }

export default Aquarium;