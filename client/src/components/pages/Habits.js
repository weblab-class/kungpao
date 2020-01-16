import React, { Component } from "react";
import GoalsList from "../modules/GoalsList.js";

import "../../utilities.css";

class Habits extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return ( <>
            <h1>Keep track of your habits.</h1>
            <button type="button">daily</button>
            <button type="button">weekly</button>
            <button type="button">monthly</button>
            <GoalsList />
            </>
        );
    }

}

export default Habits;