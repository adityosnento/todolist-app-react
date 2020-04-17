import React, { Component } from "react";
import "../../../assets/style/login/login.scss";
import { Link, Redirect } from "react-router-dom";



const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  return valid;
};


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: false,
      formErrors: {
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      console.log(`
        --SUBMITTING--
        Username or email: ${this.state.email}
        Password: ${this.state.password}
        `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = {
      ...this.state.formErrors
    };
    this.setState({
      [e.target.id]: e.target.value
    });


    switch (name) {
      case "email":
        formErrors.email =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;

      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characters required" : "";
        break;
      default:
        break;
    }


    this.setState({
      formErrors
    });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    try{
      let res = await fetch("https://ga-todolist.herokuapp.com/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        })  
      let data = await res.json();
      if(data.data.token) {
        localStorage.setItem('userData',JSON.stringify(data.data.token));
        this.setState({redirect:true})
      }
      alert("login success") 
    }catch(err){
      alert("login error") 
      console.log(err)
    }
  };

  

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }

    if (localStorage.getItem('userData')) {
      return <Redirect to={"/"}/>;
    }

    console.log(this.state.formErrors);
    const { formErrors } = this.state;

    return (
      <div className="full-container">
        <div className="side-bg">
          <h1> Hello, Friend! </h1> <p> Enter your personal details and </p>
          <p> start your journey with us! </p> <button> Sign Up </button>
        </div>
        <div className="wrapper">
          <div className="form-wrapper">
            <h1> Login </h1>
            <form onSubmit={this.handleLogin} noValidate>
              <div className="username">
                <label> Username </label>
                <input
                  type="text"
                  placeholder="email"
                  id="email"
                  required
                  onChange={this.handleChange}
                  name="email"
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage"> {formErrors.username} </span>
                )}
              </div>
              <div className="password">
                <label> Password </label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  required
                  onChange={this.handleChange}
                  name="password"
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage"> {formErrors.password} </span>
                )}
              </div>
              <div className="createAccount">
                <button>
                  Login
                </button>
                <small>
                  Not a member ? <Link to="/register"> Sign up </Link> now
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
