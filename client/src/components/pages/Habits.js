import React, { Component } from "react";

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
            <h2>Daily</h2>
            <ul>
                <li>drink 3 glasses of water</li>
                <li>eat breakfast</li>
                <li><input type="text" name="firstname"/><button type="button">+</button></li>
            </ul>
            
            </>
        );
    }

}

export default Habits;