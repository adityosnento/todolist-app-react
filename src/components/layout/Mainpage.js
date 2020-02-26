import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import HeaderTop from "../../components/layout/HeaderTop";
import FooterBottom from "../../components/layout/FooterBottom";
import MainTodoList from '../../components/dashboard/todolist/MainTodoList';
// import SideBar from '../../components/layout/SideBar';
import Login from '../../components/dashboard/login/login'
import Register from '../../components/dashboard/register/register'
import '../../assets/style/Mainpage.scss'

class Mainpage extends Component {
    render() {
        return (
    <Router>
      <Route path="/" exact>
          <div className="Container-Full">
              <HeaderTop/>
              <div>
                  <MainTodoList/>
              </div>
              <FooterBottom/>
          </div>
      </Route>
      <Route path="/login">
          <Login/>
      </Route>
      <Route path="/register">
          <Register/>
      </Route>
  </Router>
      
     
  )
}
}

export default Mainpage;

