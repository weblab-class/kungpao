import React, { Component } from "react";

class Habit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false
    };
  }

  handleInputChange = (event) => {
    const value = event.target.checked;
    this.setState({
      isDone: value
    });
  };

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.isDone}
          onChange={this.handleInputChange}
        />
        <span>{this.props.content}</span>
      </div>
    );
  }
}

export default Habit;
