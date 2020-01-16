import React, { Component } from "react";
import GoalItem from "./GoalItem.js";

class GoalsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      inputText: ""
    };

    this.keyCounter = 0;
  }

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({
      inputText: value
    });
  };

  submitGoal = () => {
    const { goals, inputText } = this.state;
    const newGoals = goals.concat([{ goal: inputText, key: this.keyCounter }]);
    this.keyCounter++;

    this.setState({
      goals: newGoals,
      inputText: ""
    });
  };

  render() {
    return (
      <div>
        {this.state.goals.map(item => (
        <GoalItem
            key={`goalItem-${item.key}`}
            content={item.goal}
            deleteGoal={() => this.deleteGoal(item.key)}
        />
        ))}
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.handleInputChange}
        />
        <button onClick={this.submitGoal}>+</button>
      </div>
    );
  }
}

export default GoalsList;
