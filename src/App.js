import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  addTask(test) {
    var { content } = this.state;
    content.push(test);
    this.setState((state) => {
      return { content: content };
    });
  }

  removeTask(id) {
    var { content, value } = this.state;
    this.setState({
      content: this.state.content.filter(function (content) {
        return content !== value;
      }),
    });
  }

  render() {
    var { content, value } = this.state;

    const inputBoxAndButton = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="type a new task"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          ></input>
          <input
            onClick={() => this.addTask(this.state.value)}
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
    const list = (
      <div>
        {content.map((value, index) => {
          return (
            <div key={index}>
              {value} &nbsp; &nbsp; &nbsp; &nbsp;
              <button onClick={() => this.removeTask(this.value)}>
                remove task
              </button>
            </div>
          );
        })}
      </div>
    );
    return (
      <div>
        <h1>To Do Task List!</h1>
        <div>
          <div>{inputBoxAndButton}</div>
          <div> &nbsp; &nbsp; &nbsp;</div>
          <div>{list}</div>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ToDo />
    </div>
  );
}

export default App;
