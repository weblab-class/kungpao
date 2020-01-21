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
        const todaysDate = new Date();
        var parsedDate = new Date(habitObj.date);
        console.log(habitObj.date === undefined);
        console.log(todaysDate.getFullYear() !== parsedDate.getFullYear());
        console.log(todaysDate.getMonth() !== parsedDate.getMonth());
        console.log(todaysDate.getDate() !== parsedDate.getDate());
        if (habitObj.date === undefined || todaysDate.getFullYear() !== parsedDate.getFullYear() ||
            todaysDate.getMonth() !== parsedDate.getMonth() ||
            todaysDate.getDate() !== parsedDate.getDate()) {
          console.log("it is a new day");
          habitObj.date = todaysDate;
          habitObj.isDone = false;
            
          const body = {id: habitObj._id, isDone: false, date: todaysDate};
          post("/api/updateHabit", body);
        }
        this.setState({ habits: this.state.habits.concat([habitObj]) });
      });
    });
    
    get("/api/money").then((moneyObj) => {
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
    post("/api/updateHabit", body).then((habit) => {
      post("/api/incrementMoney", {amount: isDone ? 1 : -1}).then((money) => {
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
