import React from 'react';
import Todo from './Todo'


function TodoList(props) {
  
  if (props.todos != null) {
    
    return (
      props.todos?.map(todo => {
        console.log(todo)
        return <Todo key ={todo.todo_id} todo={todo} filter={props.filter} setTodos={props.setTodos} userid={props.userid} updateTodos={props.updateTodos}/>
      })
    )
  }
  else return null
}

export default TodoList