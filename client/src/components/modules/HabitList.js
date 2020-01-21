import React, { Component } from "react";
import Habit from "./Habit.js";


import "./HabitList.css";

import { get } from "../../utilities";
import { post } from "../../utilities";

class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      inputText: "",
      balance: 0
    };
  }

  componentDidMount() {
    get("/api/habit").then((habitObjs) => {
      habitObjs.map((habitObj) => {
        console.log("habit id" + habitObj._id);
        const todaysDate = Date();
        if (habitObj.date && todaysDate.getFullYear() === habitObj.date.getFullYear()&&
          todaysDate.getMonth() === habitObj.date.getMonth() &&
          todaysDate.getDate() === habitObj.date.getDate()) {
          this.setState({ habits: this.state.habits.concat([habitObj]) });
        }
        else {
          habitObj.date = todaysDate;
          habitObj.isDone = false;
          this.setState({ habits: this.state.habits.concat([habitObj]) });
          const body = {id: habitObj._id, isDone: false, date: todaysDate};
          post("api/updateHabit", body);
        }
      });
    });
    
    get("api/money").then((moneyObj) => {
      console.log("balance: " + moneyObj.money);
      this.setState( { balance: moneyObj.money });
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

  updateHabitIsDone = (habitId, isDone) => {
    const body = {id: habitId, isDone: isDone};
    post("api/updateHabit", body).then((habit) => {
      post("api/incrementMoney", {amount: isDone ? 1 : -1}).then((money) => {
        console.log("increment money " + money.creator_id);
        this.setState({
          balance: this.state.balance + (isDone ? 1 : -1),
        });
      })
    });
  }

  render() {
    return (
      <div className="habitlist">
        {this.state.habits.map(item => (
        <Habit
            key={`Habit_${item._id}`}
            content={item.content}
            isDone={item.isDone}
            updateDatabaseIsDone={isDone => this.updateHabitIsDone(item._id, isDone)}
        />
        ))}
        <div className="newhabitandbutton">
          <input
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
          />
          <button onClick={this.submitHabit}>+</button>
        </div>
        <div>Balance: {this.state.balance}</div>
      </div>
    );
  }
}

export default HabitList;
