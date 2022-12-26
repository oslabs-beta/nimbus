import React, { useState } from "react";

interface Props {
  swapAuthView: () => void
  handleUserLogin: () => void
}

const Login: React.FC<Props> = ({ swapAuthView, handleUserLogin }: Props) => {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Update state when user types email or password
  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  // Hnadle wrong user input
  const handleError = (err: string) => {
    setErrorMessage(err)
  }

  const submitForm = (e:any) => {
    e.preventDefault();
    const credentials = {
      email,
      password
    }
    console.log(credentials);
    
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(credentials),
    })
    .then(res => res.json())
    .then((result) => {
      if (result.err) {
        handleError('Wrong username or password');
      }
      else {
        console.log('user info:', result);
        handleUserLogin();
        localStorage.setItem("accessToken", result.accessToken)
        localStorage.setItem("refreshToken", result.refreshToken)
      }
    });
  }


  return (
    <div>
      <h1 className="text-center text-gray-600">Login</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="email">Email</label><br></br>
        <input 
          type="text" 
          id="email" 
          name="email"
          onChange={updateEmail}
          >
        </input>
        <br></br>
        <label htmlFor="password">Password</label><br></br>
        <input 
          type="password" 
          id="password" 
          name="password"
          onChange={updatePassword}
          >
        </input>
        <br></br>
        <input type="submit" value="Submit" className="btn btn-primary w-56"></input>
      </form>
      <div className="errorMessage">{errorMessage}</div>
      <button className="btn btn-outline btn-accent w-56" onClick={swapAuthView}>Register</button>
    </div>
  )
}

export default Login;