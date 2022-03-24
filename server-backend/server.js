const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')


app.use(cors())
app.use(express.json())


const users = []

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/login', (req, res) => {

})

app.post('/login', async (req, res) => {
  const user = users.find(user => user.name == req.body.name)
  if (user == null) {
    return res.status(400).send('cannot find user')
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send({ id: user.id })
    }
    else {
      res.send('Wrong password')
    }
  } catch {
    res.status(500).send()
  }
})

app.get('/register', (req, res) => {

})

app.post('/register', async (req, res) => {
  try {
    const pass = req.body.password.toString();
    const name = req.body.name.toString();
    const hashedPassword = await bcrypt.hash(pass, 10)
    // const user =users.find(user => user.name == req.body.name)
    // if (user !== null){
    //   return res.status(401).send('Users already exists')
    // }
    users.push({
      id: users.length,
      name: name,
      password: hashedPassword,
      todos: []
    })
    res.status(200).send()
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
})

app.get('/todos/:userid', (req, res) => {
  const user = users.find(user => user.id == req.params.userid)
  if (user == null) {
    return res.status(404).send(users)
    // return res.status(404).send('User id '+ uid +' does not exists')
  }
  return res.status(200).send(user.todos)

})

app.post('/todos/:userid', (req, res) => {
  const uid = req.params.userid
  const userindex = users.findIndex(user => user.id == uid)
  if (userindex == null) {
    return res.status(404).send(users)
    // return res.status(404).send('User id '+ uid +' does not exists')
  }

  // Checking that you have valid input
  const todofields = ["body", "todo_id", "is_completed"]
  todofields.forEach(field => {
    if (!field in req.body) {
      return res.status(400).send("request is missing required field: " + field)
    }
  })

  const newtodo = req.body
  users[userindex].todos.push(newtodo)
  return res.status(200).send(users[userindex].todos)
})


//deleting one
// app.delete('/:userid/:todoid', (req, res) => {
//   const uid = req.params.userid
//   const todoid = req.params.todoid

//   const userindex = users.findIndex(user => user.id == uid)
//   const todoindex = users[userindex].todos.findIndex(todo => todo.todo_id == todoid)

//   const user = users.find(user => user.id == uid)
//   if (user == null) {
//     return res.status(404).send('Users does not exists')
//   }
//   user[userindex].todos.splice(todoindex, 1)

//   return res.status(200).send(user[userindex].todos)
// })

//delete all completed
app.post('/todos/:userid/uncompleted', (req, res) => {
  const uid = req.params.userid
  const userindex = users.findIndex(user => user.id == uid)
  const user = users.find(user => user.id == uid)
  if (user == null) {
    return res.status(404).send('Users does not exists')
  }
  const newtodo = users[userindex].todos.filter(todo => todo.is_completed == false)
  users[userindex].todos = newtodo
  return res.status(200).send(users[userindex].todos)
})

//toggle
app.post('/todos_toggle/:userid/:todoid', (req, res) => {
  // mark todo as complete/uncompleted
  const uid = req.params.userid
  const todoid = req.params.todoid
  const userindex = users.findIndex(user => user.id == uid)
  const user = users.find(user => user.id == uid)
  if (user == null) {
    return res.status(404).send('Users does not exists')
  }
  const todoindex = users[userindex].todos.findIndex(todo => todo.todo_id == todoid)
  users[userindex].todos[todoindex].is_completed = !users[userindex].todos[todoindex].is_completed


  return res.status(200).send(users[userindex].todos)

})

app.get('/todos/:userid/:status', (req, res) => {
  const uid = req.params.userid
  const filterstatus = req.params.status
  const userindex = users.findIndex(user => user.id == uid)
  const user = users.find(user => user.id == req.params.userid)
  console.log(filterstatus)
  if (user == null) {
    return res.status(404).send()
  }
  if (filterstatus == "completed") {
    const newtodo = users[userindex].todos.filter(todo => todo.is_completed == true)
    console.log(newtodo)
    return res.status(200).send(newtodo)
  }
  else if (filterstatus == "uncompleted") {
    const untodos = users[userindex].todos.filter(todo => todo.is_completed != true)
    console.log(untodos)
    return res.status(200).send(untodos)
  }
  else {
    return res.status(200).send(users[userindex].todos)
  }
})

app.listen(3001)