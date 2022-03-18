import React from 'react';
import Todo from './Todo'


function TodoList ({toggleTodo, deleteSingleTodo, filter}){

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:3001/todos/:id", requestOptions)
      .then(response => {
        if (response.status == 200){

        }

      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  },[])

  return (
        filter.map(todo => {
          return <Todo todo ={todo} toggleTodo ={toggleTodo}  deleteSingleTodo={deleteSingleTodo} filter={filter}/>
        })
  )
}

export default TodoList