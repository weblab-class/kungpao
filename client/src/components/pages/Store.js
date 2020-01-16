import React, { Component } from "react";
import SingleMessage from "../modules/SingleMessage.js";

import "../../utilities.css";
import "./Store.css";

class Store extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount(){

    }

    render() {
        return ( 
        <div>
            <div className="ChatContainer">
            Buy stuff with sand dollars.
            <button
            type="submit"
            className="Chat-button u-pointer"
            value="Submit"
            onClick={console.log("{this.handleSubmit}")}
            >
                fish food
            </button>
            <div>
                <SingleMessage/>
            </div>

            </div>
            
            
        </div>
            
        );
    }

}

export default Store;