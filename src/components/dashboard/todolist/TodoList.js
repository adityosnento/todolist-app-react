import React from "react";
import '../../../assets/style/todolist/TodoList.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const TodoList = props => {
  const list = props.lists.map(todo =>
    <li className="list-style" key={todo._id}>
      <div className="list-margin">
        <input 
        type="checkbox"
        checked={todo.completed}
        onChange={() => props.completed(todo._id, todo.completed)}  
        />
        <input 
        id="edit" 
        type="text" 
        value={todo.description} 
        className={todo.completed ? "input-checked" : "input-in"}
        onChange={(e)=>props.updateItem(todo._id, e.target.value)} 
        onBlur={(e)=>props.submitUpdate(todo._id, e.target.value)} 
        key={todo._id}/>
      </div>
      <div className="icon-awesome">
      
      <FontAwesomeIcon 
          className={ todo.importance ? "buttonTrue" : "buttonFalse"}
          icon='star' 
          onClick={() => props.important(todo._id, todo.importance)}/>
      
      <label for="edit">
        <FontAwesomeIcon 
        className="faicons edit" 
        icon='edit' />
      </label>
        
        <FontAwesomeIcon 
        className="faicons del" 
        icon='trash' 
        onClick={() => props.del(todo._id)}/>
      </div>
    </li>   
  ).reverse();
  

  return(
    <div className="margin-left-ul">
      <ul>
        {list}
      </ul>
    </div>
  )
}

export default TodoList;

