import React, { Component } from "react";
import Habit from "./Habit.js";
import sanddollar from "../data/sanddollar.png";


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
    var habitsToReset = [];
    get("/api/habit").then((habitObjs) => {
      habitObjs.map((habitObj) => {
        const todaysDate = new Date();
        var parsedDate = new Date(habitObj.date);
        console.log("is there date " + habitObj.date);
        if (habitObj.date === undefined || todaysDate.getFullYear() !== parsedDate.getFullYear() ||
            todaysDate.getMonth() !== parsedDate.getMonth() ||
            todaysDate.getDate() !== parsedDate.getDate()) {
          habitObj.date = todaysDate;
          habitObj.isDone = false;
            
          habitsToReset.push({id: habitObj._id, isDone: false, date: todaysDate});
        }
        this.setState({ habits: this.state.habits.concat([habitObj]) });
      });

      for (var index in habitsToReset) {
        console.log(habitsToReset[index].id);
        post("/api/updateHabit", habitsToReset[index]);
      }
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
    console.log(event.keyCode);
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      console.log("enter pressed")
      // Trigger the button element with a click
      document.getElementById("submitHabitButton").click();
    }
  };

  addNewHabit(habitObj) {
    this.setState({
      habits: this.state.habits.concat([habitObj]),
      inputText: ""
    });
  }

  submitHabit = (event) => {
    event.preventDefault();
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
      <div className="habitlist-container">
          
        <div className="panel">
          {this.state.habits.map(item => (
          <Habit
              key={`Habit_${item._id}`}
              content={item.content}
              isDone={item.isDone}
              updateDatabaseIsDone={isDone => this.updateHabitIsDone(item._id, isDone)}
          />
          ))}

          <div className="newhabitandbutton" >
            <form>
                <input
                  type="text"
                  className="text"
                  placeholder="Add a new daily habit"
                  value={this.state.inputText}
                  onChange={this.handleInputChange}
                />
                <input
                  type="submit"
                  className="button"
                  value="+"
                  onClick={this.submitHabit}
                />
            </form>
          </div>
        </div>

        <div className="panel">
          <div className="balance">
            <div>Balance: {this.state.balance}</div>
            <img src={sanddollar} alt="sanddollar"></img>
          </div>
          <div>Use sanddollars in the store to buy fish for your aquarium.</div>
        </div>
      </div>
    );
  }
}

export default HabitList;
