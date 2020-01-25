import React, { Component } from "react";
import Habit from "./Habit.js";
import sanddollar from "../data/sanddollar.png";

import { toDay, toWeek, toMonth } from "../util/date.js";

import "./HabitList.css";

import { get } from "../../utilities";
import { post } from "../../utilities";

class HabitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      type: "daily",
      title: "",
      inputText: "",
      balance: 0
    };
  }

  componentDidMount() {
    const todaysDate = new Date();
    this.setState( { title: toDay(todaysDate) });
    this.reloadHabitList("daily");
    
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

    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();

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
    const body = {content: this.state.inputText, type: this.state.type};
    post("api/habit", body).then((habit) => {
      this.addNewHabit(habit);
    });
  };

  updateHabitIsDone = (habitId, isDone) => {
    const body = {id: habitId, isDone: isDone, date: new Date()};
    post("/api/updateHabit", body).then((habit) => {
      post("/api/incrementMoney", {amount: isDone ? 1 : -1}).then((money) => {
        this.setState({
          balance: this.state.balance + (isDone ? 1 : -1),
        });
      })
    });
  }

  reloadHabitList = (type) => {
    var habitsToReset = [];
    var habits = [];
    var todaysDate = new Date();
    if (type === "daily") {
      this.setState( { title: toDay(todaysDate) });
    }
    else if (type === "weekly") {
      this.setState( { title: toWeek(todaysDate) });
    }
    else {
      this.setState( { title: toMonth(todaysDate) });
    }
    get("/api/habit", {type: type} ).then((habitObjs) => {
      habitObjs.map((habitObj) => {
        var parsedDate = new Date(habitObj.date);
        var todaysDate = new Date();
        if (habitObj.date === undefined || todaysDate.getFullYear() !== parsedDate.getFullYear() ||
            todaysDate.getMonth() !== parsedDate.getMonth() ||
            todaysDate.getDate() !== parsedDate.getDate()) {
          habitObj.date = todaysDate;
          habitObj.isDone = false;
            
          habitsToReset.push({id: habitObj._id, isDone: false, date: todaysDate});
        }
        habits.push(habitObj);
      });

      this.setState( { habits: habits, type: type });


      for (var index in habitsToReset) {
        post("/api/updateHabit", habitsToReset[index]);
      }
    });
  }

  dailyTab = () => {
    this.reloadHabitList("daily");
  }

  weeklyTab = () => {
    this.reloadHabitList("weekly");
  }

  monthlyTab = () => {
    this.reloadHabitList("monthly");
  }

  render() {
    return (
      <div className="habitlist-container">

        <div>
          <button className="button" onClick={this.dailyTab} type="button">daily</button>
          <button className="button" onClick={this.weeklyTab} type="button">weekly</button>
          <button className="button" onClick={this.monthlyTab} type="button">monthly</button>

          <div className="panel">

            <div>{this.state.title}</div>
          
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
                    placeholder={"Add a new " + this.state.type + " habit"}
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
        
        </div>  
          
        <div>
          <div className="panel">
            <div className="balance">
              <div>Balance: {this.state.balance}</div>
              <img src={sanddollar} alt="sanddollar"></img>
            </div>
            <div>Use sanddollars in the store to buy fish for your aquarium.</div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default HabitList;
