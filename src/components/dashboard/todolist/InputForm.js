import React from "react";
import '../../../assets/style/todolist/InputForm.scss'


class InputForm extends React.Component {
    state = {
        name: "",
        description: ""
    }


        handleTitleChange = e => {
            this.setState({[e.target.name]: e.target.value})
        }

    addNewTodo = async(e) => {
        e.preventDefault()
        try {
          let res = await fetch("https://ga-todolist.herokuapp.com/api/task/create", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization":JSON.parse(localStorage.getItem("userData")),
            },
            body:JSON.stringify({  
              "name": "Adit",
	            "description": this.state.description,
	            "dueDate": this.state.dueDate
            })
          })
          this.setState({description: ""})
          await res.json()
          await this.props.getAll()
        }catch(err) {
          console.log(err)
        }
      }
      
      render () {
          return(
        <form onSubmit={this.addNewTodo} className="form-desc">
            <input type="text" className="input-data" value={this.state.description} name="description" placeholder="Your Activity Today" onChange={this.handleTitleChange}/>
            <button className="btn"><i class="fas fa-plus">Submit</i></button>
        </form>
          )
      }
    
}

export default InputForm;