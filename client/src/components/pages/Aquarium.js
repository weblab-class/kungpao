import React, { Component } from "react";

import "../../utilities.css";
import "./Aquarium.css";
import Fish from "../modules/Fish.js";


import doryfish from "../data/doryfish.png";
import byfish from "../data/blueyellowfish.png";
import purplecoral from "../data/purplecoral.png";
import cfish from "../data/clownfish.png";
import gyp from "../data/greenyellowpuffer.png";
import patch from "../data/patchyfish.png";
import peach from "../data/peachpuffer.png";
import pink from "../data/pinkfish.png";
import purplepeach from "../data/purplepeachfish.png";
import seaweed from "../data/seaweed.png";
import yfish from "../data/yellowfish.png";

import bubble from "./bubble.png";
import Popup from "../modules/Popup.js";
import FishPopup from "../modules/FishPopup.js";

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

      displayFish = (fishname) => {
        console.log(fishname);
        if (fishname == 'doryfish') {
          console.log('heLLOOOOo');
          return doryfish;
        }
        else if (fishname == 'blueyellowfish') {
          return byfish;
        }
        else if (fishname == 'purplecoral') {
          return purplecoral;
        }
        else if (fishname == 'greenyellowpuffer') {
          return gyp;
        }
        else if (fishname == 'patchyfish') {
          return patch;
        }
        else if (fishname == 'peachpuffer') {
          return peach;
        }
        else if (fishname == 'pinkfish') {
          return pink;
        }
        else if (fishname == 'purplepeachfish') {
          return purplepeach;
        }
        else if (fishname == 'clownfish') {
          return cfish;
        }
        else if (fishname == 'yellowfish') {
          return yfish;
        }
        else if (fishname == 'seaweed') {
          return seaweed;
        }
      }

      render() {

        return (
          <div>
            <div className="button-container">
            <button onClick={this.props.checkifFed}> Feed fish</button>
            </div>
            <div className="button-container">
            <button onClick={this.props.pickingFish}>Place Items</button>
            </div>

            {this.props.fishList.map((f) => (
              <Fish image={this.displayFish(f.type)}/>
            ))}

        {this.props.showPopup ? <Popup popText={this.props.popText}
          onClose={this.props.togglePopup}>
        </Popup> : null}
        {this.props.pickFish ? <FishPopup onClose={this.props.pickingFish} availFish = {this.props.notplaced} addingFish ={byfish => this.props.addingFish(byfish)}></FishPopup> : null}
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