import React, { useState, useEffect } from 'react';
import "./App.css";
import Form from "./Component/Form";
import Login from "./Component/Login";
import TodoList from "./Component/TodoList";
import Register from "./Component/Register";

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('All')
  const [filter, setFilter] = useState([])
  const [loginStatus, setLoginStatus] = useState(false)
  const [registerStatus, setRegisterStatus] = useState(false)
  const [userid, setUserid] = useState(null)

  useEffect(() => {
    console.log(userid)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    console.log("pre fetch: "+userid)
    fetch("http://localhost:3001/todos/"+ userid, requestOptions)
      .then(response => {
        if (response.status == 200) {
          return response.json()
        }
      })
      .then(data =>{
        console.log(data)
        setTodos(data)
      })
      .catch(error => console.log('error', error));
    console.log("fetched todos")
  }, [userid])

  const userLogIn = (uid) => {
    setUserid(uid)
  }

  const updateTodos = (data) =>{
    setTodos(data)
  }

  // const toggleTodo = async (id) => {
  //   const newTodos = [...todos]
  //   const todo = newTodos.find(todo => todo.id === id)
  //   todo.complete = !todo.complete
  //   setTodos(newTodos)
  // }


  // function filterHandler() {
  //   switch (status) {
  //     case 'completed':
  //       setFilter(todos.filter(todo => todo.complete === true))
  //       break;
  //     case 'uncompleted':
  //       setFilter(todos.filter(todo => todo.complete === false))
  //       break
  //     default:
  //       setFilter(todos)
  //       break
  //   }
  // }
  
  return (
    <div className="App">
      <header>
        <h1>ToDo List</h1>
      </header>
      <div className="Info">
        {!loginStatus ?
          <div>
            {registerStatus ?
              <Login setLoginStatus={setLoginStatus} userLogIn={userLogIn} userid={userid} />
              :
              <Register setRegisterStatus={setRegisterStatus} />
            }
          </div>
          :
          <div>
            <Form className="Form" setTodos={setTodos} todos={todos} setFilter={setFilter} status={status} setStatus={setStatus} userid={userid} updateTodos={updateTodos}/>
            <TodoList className="todolist" userid={userid} setTodos={setTodos} filter={filter} todos={todos} updateTodos={updateTodos}/>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
