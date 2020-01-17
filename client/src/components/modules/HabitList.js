import React, { Component } from "react";
import Habit from "./Habit.js";

class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
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

  submitHabit = () => {
    const { habits, inputText } = this.state;
    const newHabits = habits.concat([{ habit: inputText, key: this.keyCounter }]);
    this.keyCounter++;

    this.setState({
      habits: newHabits,
      inputText: ""
    });
  };

  render() {
    return (
      <div>
        {this.state.habits.map(item => (
        <Habit
            key={`habit-${item.key}`}
            content={item.habit}
            deleteHabit={() => this.deleteHabit(item.key)}
        />
        ))}
        <input
          type="text"
          value={this.state.inputText}
          onChange={this.handleInputChange}
        />
        <button onClick={this.submitHabit}>+</button>
      </div>
    );
  }
}

export default HabitList;
