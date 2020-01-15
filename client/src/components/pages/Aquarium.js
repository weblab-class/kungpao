import React, { Component } from "react";

import "../../utilities.css";
import "./Aquarium.css";
import Fish from "../modules/Fish.js"

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
    
      componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
      }
    
      render() {
        return (
          <div>
            <div className='water' style={{ ...this.state, zIndex:-1 }}></div>
            <div className='water' style={{ ...this.state, zIndex:-10 }}></div>
            <div className='water' style={{ ...this.state, zIndex:-20 }}></div>
            <div className='water' style={{ ...this.state, zIndex:-30 }}></div>
            <div className='water' style={{ ...this.state, zIndex:-40 }}></div>
            <div className='water' style={{ ...this.state, zIndex:-50 }}></div>
            <div className='water' style={{ ...this.state, zIndex:-60 }}></div>
            <Fish image="./doryfish.png"/>
          </div>
        );
      }
    }

export default Aquarium;