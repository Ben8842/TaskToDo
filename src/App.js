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
      valueName: "",
      saveListFlag: false,
      appUserName: "",
      appUserData: [],
      appListName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.state.taskholder);
    /* const storageTasks = JSON.parse(localStorage.getItem("toDoData"));

    if (storageTasks !== null) {
      this.setState((state) => {
        return {
          content: storageTasks,
        };
      });
    } */

    const userLocalStorage = JSON.parse(localStorage.getItem("userLocalData"));
    const userLocalListName = JSON.parse(localStorage.getItem("userLocalList"));
    if (userLocalStorage !== null) {
      this.setState((state) => {
        return {
          appUserName: userLocalStorage,
          appListName: userLocalListName,
        };
      });
    } else if (userLocalStorage === null) {
      fetch("http://localhost:5000/userinfo", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ username: "none" }),
        // body data type must match "Content-Type" header
      }).then((res) => {
        console.log(res);
      });

      fetch("http://localhost:5000/userinfo", {
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
            appUserName: data,
          });

          console.log("added unique id from db entry to appUserName");
          localStorage.setItem(
            "userLocalData",
            JSON.stringify(this.state.appUserName)
          );
        });
    }

    this.getList();
  }

  saveList(nameinput) {
    this.setState({ appListName: nameinput });
    var { appUserName, appListName } = this.state;

    fetch("http://localhost:5000/tasks", {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ appUserName, appListName }),
      //   body: JSON.stringify({ showButtonIndex }),
    }).then((res) => {
      console.log(res);
      this.getList();
      //    console.log("something happening here" + res);
    });

    console.log("hello name of list SAVING" + nameinput);
    localStorage.setItem(
      "userLocalList",
      JSON.stringify(this.state.appListName)
    );
    //this.clickHandler();
  }

  shuffle(arry) {
    arry.sort(() => Math.random() - 0.5);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      valueName: event.target.valueName,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      value: "",
      valueName: "",
    });
  }

  addTask(newInput) {
    //. console.log("submit Sign Up now");
    const { content, appUserName, appListName } = this.state;
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
      body: JSON.stringify({
        text: content[content.length - 1],
        listname: appListName,
        userIdentification: appUserName,
      }),
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
    var { taskholder, appUserName } = this.state;
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

    console.log(this.state.taskholder);
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
    var { content, choice, taskholder, appUserName, appUserData, appListName } =
      this.state;

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
            type="button"
            value="Submit"
          />
        </form>
      </div>
    );

    const saveListNameAndInput = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="name your list and save"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          ></input>
          <input
            onClick={() => this.saveList(this.state.value)}
            type="button"
            value="SaveList"
          />
        </form>
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
          if (
            taskholder[i].userIdentification === this.state.appUserName &&
            taskholder[i].listname === this.state.appListName
          ) {
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
          }
        })}
        {inputBoxAndButton}
      </div>
    );

    return (
      <div>
        <h5>
          {" "}
          User Name is :{" "}
          <div>{appUserName ? appUserName : "this is empty"} </div>
        </h5>
        {saveListNameAndInput}
        <h1>To Do Task List!</h1>
        <div>
          <div> &nbsp; &nbsp; &nbsp;</div>
          <div>
            Name of List is : {appListName ? appListName : "empty name"}
          </div>
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
