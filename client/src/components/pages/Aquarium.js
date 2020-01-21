import React, { Component } from "react";

import "../../utilities.css";
import "./Aquarium.css";
import Fish from "../modules/Fish.js";

import bubble from "./bubble.png";
import Popup from "../modules/Popup.js";
import FishPopup from "../modules/FishPopup.js";

import purplecoral from "../data/purplecoral.png";
import seaweed from "../data/seaweed.png";



class Aquarium extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.fishList);
        this.state = {
          showPopup: false,
          popText: "",
          pickFish: false,
        };
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

      togglePopup = () => {
        this.setState({
          showPopup: !this.state.showPopup
        });
        console.log("toggled");
      }

      pickingFish = () => {
        this.setState({
          pickFish: !this.state.pickFish
        });
      }

      setProperty = (item, mar) => {
        item.style.setProperty('--img-position', mar + 'px');
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
            <div className="both-buttons">
              <div></div>
              <div></div>
              <div></div>
            <div className="button-container">
            <button onClick={this.props.checkifFed}> Feed fish</button>
            </div>
            <div className="button-container">
            <button onClick={this.props.pickingFish}>Place Items</button>
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
          onClose={this.props.togglePopup}>
        </Popup> : null}
        {this.props.pickFish ? <FishPopup onClose={this.props.pickingFish} availFish = {this.props.notplaced} addingFish ={byfish => this.props.addingFish(byfish)} displayFish = {this.props.displayFish}></FishPopup> : null}
            <div className='water' style={{ ...this.state, zIndex:-1 }}>
              <div className='bubble'>
                <img src={bubble} alt="bubble"></img>
              </div>
            </div>
          </div>
        );
      }
    }

export default Aquarium;