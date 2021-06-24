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

  componentDidMount() {
    // const storageTasks = localStorage.getItem("toDoData") === "true";
    const storageTasks = JSON.parse(localStorage.getItem("toDoData"));
    //  console.log(localStorage.getItem("toDoData"));
    // this.setState({ content: storageTasks });
    if (storageTasks !== null) {
      this.setState((state) => {
        return {
          content: storageTasks,
        };
      });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  addTask(newInput) {
    var { content } = this.state;
    content.push(newInput);
    this.setState((state) => {
      return { content: content };
    });
    localStorage.setItem("toDoData", JSON.stringify(content));
  }

  removeTask(id) {
    var { content } = this.state;
    console.log(content[id]);
    this.setState({
      content: this.state.content.filter(function (element) {
        return element !== content[id];
      }),
    });
    localStorage.setItem("toDoData", JSON.stringify(content));
  }

  render() {
    var { content } = this.state;

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
        {content.map((item, index) => {
          return (
            <div key={index}>
              {item} &nbsp; &nbsp; &nbsp; &nbsp;
              <button onClick={() => this.removeTask(index)}>
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
