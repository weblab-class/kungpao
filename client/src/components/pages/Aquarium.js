import React, { Component } from "react";

import "../../utilities.css";
import "./Aquarium.css";
import Fish from "../modules/Fish.js";
import doryfish from "../data/doryfish.png";
import bubble from "./bubble.png";


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

      render() {
        return (
          <div>
            <button onClick={this.props.checkifFed}> Feed fish</button>
            <button onClick={this.props.pickingFish}>Place Items</button>

            {this.props.fishList.map((f) => (
              <Fish image={f}/>
            ))}
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