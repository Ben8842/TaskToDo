import "./App.css";
import React, { Component } from "react";

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      value: "",
      choice: "",
      taskholder: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    /* const storageTasks = JSON.parse(localStorage.getItem("toDoData"));

    if (storageTasks !== null) {
      this.setState((state) => {
        return {
          content: storageTasks,
        };
      });
    } */
    this.getList();
  }

  shuffle(arry) {
    arry.sort(() => Math.random() - 0.5);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      value: "",
    });
  }

  addTask(newInput) {
    //. console.log("submit Sign Up now");
    const { content } = this.state;
    content.push(newInput);
    this.setState((state) => {
      return {
        content: content,
      };
    });
    //  console.log(JSON.stringify({ email, password }));
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ text: content[content.length - 1] }),
      // body data type must match "Content-Type" header
    }).then((res) => {});
    this.getList();

    /*
    var { content } = this.state;
    content.push(newInput);
    this.setState((state) => {
      return {
        content: content,
      };
    });
    localStorage.setItem("toDoData", JSON.stringify(content));
    */
  }

  getList() {
    var { taskholder } = this.state;
    fetch("http://localhost:5000/tasks", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
    })
      .then((res) => {
        //    console.log(JSON.stringify(res) + ".thenres");
        return res.json();
      })
      .then((data) => {
        this.setState({
          taskholder: data,
        });

        console.log("GETLIST FUNCTION TRIGGERED");
      });
  }

  removeTask(e) {
    console.log("we are removing something now with id=" + e.target.id);
    fetch("http://localhost:5000/tasks/" + e.target.id, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      //   body: JSON.stringify({ showButtonIndex }),
    }).then((res) => {
      //    console.log("something happening here" + res);
    });
    this.getList();

    /*
    var { content } = this.state;

    var placeholder = this.state.content.filter(function (element) {
      return element !== content[id];
    });
    this.setState({
      content: placeholder,
    });

    localStorage.setItem("toDoData", JSON.stringify(placeholder));*/
  }

  render() {
    var { content, choice, taskholder } = this.state;

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
        <div>Your random task choice is: {choice}</div>
      </div>
    );
    /*
    const listN = (
      <div>
        {taskholder.map((item, index) => {
          return (
            <div key={index}>
              <button onClick={() => this.removeTask(index)}>X</button>
              &nbsp;&nbsp;{index + 1} &nbsp; &nbsp; &nbsp; &nbsp; {item}
            </div>
          );
        })}
      </div>
    );*/

    const list = (
      <div>
        {Object.keys(taskholder).map((keyName, i) => {
          return (
            <div key={i}>
              <button
                onClick={(e) => this.removeTask(e)}
                type="button"
                id={taskholder[parseInt(keyName, 10)]._id}
              >
                X
              </button>
              &nbsp;&nbsp;{i + 1} &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {taskholder[parseInt(keyName, 10)].text}
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
