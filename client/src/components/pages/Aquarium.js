import React, { Component } from "react";

import "../../utilities.css";
import "./Aquarium.css";
import Fish from "../modules/Fish.js"
import doryfish from "../data/doryfish.png"
import underwater from "./underwater.jpg"


class Aquarium extends Component {

  
    constructor(props) {
        super(props);
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
    
      

      render() {
        return (
          <div>
            
            <div className='water' style={{ ...this.state, zIndex:-1 }}></div>
            <Fish image={doryfish}/>
          </div>
        );
      }
    }

export default Aquarium;