import React from 'react'


export default function Todo(props) {

  function todoClick() {
    var requestOptions = {
      method: 'POST',
    };

    fetch("http://localhost:3001/todos_toggle/" + props.userid + "/" + props.todo.todo_id, requestOptions)
      .then(res => {
        return res.json()
      })
      .then(data => {
        props.updateTodos(data)
      })
      .catch(error => console.log('error', error));
  }

  // function deleteClick() {
  //   fetch('localhost:3001/' + props.userid + "/" + props.todo.todo_id, {
  //     method: "DELETE",
  //   })
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(data => {
  //       props.updateTodos(data)
  //     })
  //     .catch(error => console.log('error', error));
  // }


  return (
    <div className="todo" >
      <label className={props.todo.is_completed ? "completed" : ""}>
        <input type="checkbox" checked={props.todo.is_completed} onChange={todoClick} />
        {props.todo.body}
        {/* <button onClick={deleteClick}>x</button> */}
      </label>
    </div>
  )
}
