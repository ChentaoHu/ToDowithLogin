import React, { useRef } from 'react'

export default function Login(props) {
  const account = useRef();
  const password = useRef();


  function formSubmit(e) {
    e.preventDefault()
    const name = account.current.value
    const pass = password.current.value

    var shippingLabel = new Headers();
    shippingLabel.append("Content-Type", "application/json");

    var payload = JSON.stringify({
      "name": name,
      "password": pass
    })

    var requestPackage = {
      method: 'POST',
      headers: shippingLabel,
      body: payload
    };

    // props.setLoginStatus(true)
    fetch("http://localhost:3001/login", requestPackage)
      .then(res => {
        return res.json()
    })  
      .then(data => {
        if ("id" in data) {
          const uid = data.id 
          console.log("result: " +uid)
          props.userLogIn(uid)
          props.setLoginStatus(true)
          console.log("props"+ props.userid)
        }
      })
      .catch(except => {
        alert("login failed")
      })
  }

  return (
    < div >
      <h1>Login</h1>
      <form>
        <div>
          <label >Name</label>
          <input ref={account} type="text" required />
        </div>
        <div>
          <label>Password</label>
          <input ref={password} required />
        </div>
        <button onClick={formSubmit} type="submit">login</button>
      </form>
    </div >
  )
}

