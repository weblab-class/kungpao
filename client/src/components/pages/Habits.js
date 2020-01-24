import React, { Component } from "react";
import HabitList from "../modules/HabitList.js";

import "../../utilities.css";
import "./Habits.css";
import Fish from "../modules/Fish.js";

class Habits extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return ( <>
            {this.props.fishList.map((f) => (
              <Fish image={this.props.displayFish(f.type)}/>
            ))}
            <HabitList />
            </>
        );
    }

}

export default Habits;