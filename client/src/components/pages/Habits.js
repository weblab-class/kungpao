import React, { Component } from "react";
import HabitList from "../modules/HabitList.js";

import "../../utilities.css";
import "./Habits.css";

class Habits extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return ( <>
            <h1>Keep track of your habits.</h1>
            <button class="button" type="button">daily</button>
            <button class="button" type="button">weekly</button>
            <button class="button" type="button">monthly</button>
            <HabitList />
            </>
        );
    }

}

export default Habits;