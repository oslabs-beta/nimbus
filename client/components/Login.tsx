import React, { useState } from "react";
import { AuthProps } from "../types";


const Login: React.FC<AuthProps> = ({ swapAuthView, handleUserLogin }: AuthProps) => {
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

  // Send user credentials to server and receive access and refresh tokens
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
        // Save tokens to local storage
        localStorage.setItem("accessToken", result.accessToken)
        localStorage.setItem("refreshToken", result.refreshToken)
      }
    });
  }
  
  return (
    <div className="hero-content flex-col lg:flex-row-reverse px-12">
      <div className="text-center lg:text-left lg:ml-5">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6">
          Welcome to nimbus, the ultimate monitoring and visualization tool for AWS Lambda. 
        </p>
      </div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <form onSubmit={submitForm}>
            <div className="form-control">
              <label htmlFor="email" className="label"><span className="label-text">Email</span></label>
              <input 
                type="text" 
                id="email" 
                name="email"
                onChange={updateEmail}
                className="input input-bordered"
                >
              </input>
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label"><span className="label-text">Password</span></label>
              <input 
                type="password" 
                id="password" 
                name="password"
                onChange={updatePassword}
                className="input input-bordered"
                >
              </input>
            </div>
            <div className="form-control">
              <input type="submit" value="Submit" className="btn btn-primary mt-5"></input>
            </div>
          </form>
          <button className="btn btn-outline btn-secondary" onClick={swapAuthView}>Register</button>
        </div>
      </div>
      { (errorMessage !== '')
        && 
        <div className="alert alert-error shadow-lg fixed bottom-0 mt-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorMessage}</span>
          </div>
        </div>
      }
    </div>
    
  )
}

export default Login;