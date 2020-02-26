import React from "react";
import TodoList from "./TodoList";
import InputForm from "./InputForm";
import "../../../assets/style/MainTodoList.scss";
import axios from "axios";

// import Pagination from "./Pagination";

class MainTodoList extends React.Component {
  state = {
    todos: [],
    description: "",
    name: "",
    button: true,
    token: {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("userData"))
      }
    },
    filter: "importance",
    selectedFile: null
  };

  getAllData = async () => {
    const Link = `https://ga-todolist.herokuapp.com/api/task/${this.state.filter}?page=1&limit=10`;
    try {
      let res = await fetch(Link, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("userData"))
        }
      });
      let data = await res.json();
      if (data.status === true) {
        this.setState({ todos: data.data.docs });
      }
    } catch (err) {
      console.log(err);
    }
  };

  updateItem = (id, data) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo._id === id) {
          todo.description = data;
        }
        return todo;
      })
    });
  };

  submitUpdate = async (_id, value) => {
    try {
      let res = await fetch(
        `https://ga-todolist.herokuapp.com/api/task/update/${_id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("userData"))
          },
          body: JSON.stringify({
            name: "Adityo",
            description: value,
            duedate: "2020-9-26"
          })
        }
      );
      let data = await res.json();
      console.log(data);
    } catch {
      console.log("err");
    }
  };

  toAddNewTodo = data => {
    console.log(data);
    this.setState({
      todos: [...this.state.todos, data.results]
    });
  };

  deleteTodos = async id => {
    try {
      axios
        .delete(
          `https://ga-todolist.herokuapp.com/api/task/delete/${id}`,
          this.state.token
        )
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            todos: this.state.todos.filter(todo => todo._id !== id)
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  important = async (id, imp) => {
    await this.setState({
      importance: !imp
    });

    const task = {
      importance: this.state.importance
    };

    try {
      await axios.put(
        `https://ga-todolist.herokuapp.com/api/task/importance/${id}`,
        task,
        this.state.token
      );
      await this.getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  completed = async (id, com) => {
    await this.setState({
      completed: !com
    });

    const complete = {
      completed: this.state.completed
    };

    try {
      await axios.put(
        `https://ga-todolist.herokuapp.com/api/task/complete/${id}`,
        complete,
        this.state.token
      );
      await this.getAllData();
    } catch (error) {
      console.log(error);
    }
  };


  componentDidMount() {
    this.getAllData();
    console.log("halo")
  }

  tabProgress = (param) => {
    this.setState({filter:param})
    this.getAllData();
  }

  uploadHandler = (e) => {
    this.setState({
      selectedFile : e.target.file[0]
    })
  }

  uploadSubmit = async () => {
    const upload = new FormData()

    upload.append = ('image', this.state.selectedFile, this.state.selectedFile.name)
    
    try {
      await axios.put(
        `https://ga-todolist.herokuapp.com/api/user/profile/`,
        upload,
        this.state.token
      );
      await(res =>{
        console.log(res.data)
        this.setState({
          
          
        })
        localStorage.setItem('userData',JSON.stringify(data.data.token));
        alert('data upload succes')
      })
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
        <div className="container-dev-2">
           <div className="sidebar-container">
                <div className="profile-content">
                    <img src={require('../../../assets/picture/profile.jpg')} alt="user"/>
                    <p>Adityo S. Nento</p>
                    <input type="file" onChange={this.uploadHandler}/>
                    <button onClick={this.uploadSubmit}>Upload File</button>
                </div>
                <div className="task-content">
                    <ul>
                        <li onClick={() => this.tabProgress("my-task")}>My Day</li>
                        <li onClick={() => this.tabProgress("importance")}>Importance</li>
                        <li onClick={() => this.tabProgress("complete")}>Complete</li>
                    </ul>
                </div>
                
            </div>

            <div className="form-container">
                <h1>Welcome to TodoList!</h1>
                <InputForm addNew={this.toAddNewTodo} getAll={this.getAllData} />
                <TodoList
                  lists={this.state.todos}
                  del={this.deleteTodos}
                  updateItem={this.updateItem}
                  submitUpdate={this.submitUpdate}
                  state={this.state.button}
                  important={this.important}
                  completed={this.completed}
                />
                <div>
                  todos left:{" "} {this.state.todos.filter(todo => !todo.completed).length}
                </div>
            </div>
        </div>
        
    );
  }
}

export default MainTodoList;
