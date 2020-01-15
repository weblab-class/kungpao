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
            <button type="button">daily</button>
            <button type="button">weekly</button>
            <button type="button">monthly</button>
            <ul>
                <li><input type="checkbox"/>drink 3 glasses of water</li>
                <li><input type="checkbox"/>eat breakfast</li>
                <li><input type="text" name="firstname"/><button type="button">+</button></li>
            </ul>
            
            </>
        );
    }

}

export default Habits;