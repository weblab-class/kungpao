import React, { Component } from "react";

import "../../utilities.css";
import "./Aquarium.css";
import Fish from "../modules/Fish.js";
import doryfish from "../data/doryfish.png";
import byfish from "../data/blueyellowfish.png";
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
    
      // componentWillUnmount() {
      //   window.removeEventListener('resize', () => this.handleResize());
      // }

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
      }

      render() {
        return (
          <div>
            <button onClick={this.props.checkifFed}> Feed fish</button>
            <button onClick={this.props.pickingFish}>Place Items</button>

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