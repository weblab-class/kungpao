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
      <label className='habit-container'>
        <input
          type="checkbox"
          defaultChecked={this.props.isDone}
          onChange={this.handleInputChange}
        />
        <span className="checkmark"></span>
        <span className="text">{this.props.content}</span>
        <button onClick={this.props.deleteHabit} type="button">X</button>
      </label>
    );
  }
}

export default Habit;
