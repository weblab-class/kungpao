import React, { Component } from "react";

import "./Response.css";

/**
 * Renders a single response option.
 *
 * Proptypes
 * @param {MessageObject} message
 */
class Response extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
            <button
            type="submit"
            className="Chat-button u-pointer"
            value="Submit"
            onClick={console.log("{this.handleSubmit}")}
            >
                {this.props.response}
            </button>
        </div>
      );
    }
  }
  
export default Response;
  