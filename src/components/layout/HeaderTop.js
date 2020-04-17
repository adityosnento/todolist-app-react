import React, { Component } from 'react';
import  '../../assets/style/HeaderTop.scss';
import {Link, Redirect} from "react-router-dom";

class HeaderTop extends Component {

state ={
    Redirect:false
}


componentDidMount() {
    if (localStorage.getItem('userData')) {
    } else {
        this.setState({redirect:true})
    }
}



logout = () => {
    localStorage.clear();
    this.setState({Redirect:true})
}

    render() {

        if(this.state.Redirect) {
            return (<Redirect to={'/login'}/>)
        }
        
        return (
            <div className="Container">
                    <div className="todo-container">
                        <p>TODOLIST - KEL E</p>
                    </div>
                    <div className="navbar-container">
                        <Link to="/login" onClick={this.logout}>Logout</Link>
                    </div>
            </div>
        )
    }
}

export default HeaderTop;