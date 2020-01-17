import React, { Component } from "react";
import Habit from "./Habit.js";

import { get } from "../../utilities";
import { post } from "../../utilities";

class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      inputText: ""
    };
  }

  componentDidMount() {
    get("/api/habit").then((habitObjs) => {
      habitObjs.map((habitObj) => {
        this.setState({ stories: this.state.habits.concat([habitObj]) });
      });
    });
  }

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({
      inputText: value
    });
  };

  addNewHabit(habitObj) {
    this.setState({
      habits: this.state.habits.concat([habitObj]),
      inputText: ""
    });
  }

  submitHabit = () => {
    const body = {content: this.state.inputText};
    post("api/habit", body).then((habit) => {
      this.addNewHabit(habit);
    });
  };

  render() {
    return (
      <div>
        {this.state.habits.map(item => (
        <Habit
            key={`Habit_${item._id}`}
            content={item.content}
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
