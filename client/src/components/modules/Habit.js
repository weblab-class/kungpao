import React, { Component } from "react";

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
      <div>
        <input
          type="checkbox"
          defaultChecked={this.props.isDone}
          onChange={this.handleInputChange}
        />
        <span>{this.props.content}</span>
      </div>
    );
  }
}

export default Habit;
