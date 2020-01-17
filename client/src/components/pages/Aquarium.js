import React, { Component } from "react";

import "../../utilities.css";
import "./Aquarium.css";
import Fish from "../modules/Fish.js";
import doryfish from "../data/doryfish.png";


class Aquarium extends Component {

  
    constructor(props) {
        super(props);
        console.log(this.props.fishList);
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
            {this.props.fishList.map((f) => (
              <Fish image={f}/>
            ))}
            <div className='water' style={{ ...this.state, zIndex:-1 }}></div>
            
            {/* <Fish image={doryfish}/> */}
          </div>
        );
      }
    }

export default Aquarium;