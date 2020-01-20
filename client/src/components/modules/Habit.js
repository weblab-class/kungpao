import React, { Component } from "react";

import "./Habit.css";

class Habit extends Component {
  constructor(props) {
    super(props);
  }

  handleInputChange = (event) => {
    const value = event.target.checked;
    this.props.updateDatabaseIsDone(value);
  };

  render() {
    return (
      <label class='habit-container'>
        <input
          type="checkbox"
          defaultChecked={this.props.isDone}
          onChange={this.handleInputChange}
        />
        <span class="checkmark"></span>
        <span class="text">{this.props.content}</span>
      </label>
    );
  }
}

export default Habit;
