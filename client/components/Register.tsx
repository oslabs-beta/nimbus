import React, { useState } from "react";

interface Props {
  swapAuthView: () => void;
}

interface UserData {
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  confirmation: String
}

const Register: React.FC<Props> = ({ swapAuthView }: Props) => {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  // Update state when user types email, password etc.
  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    console.log(email)
  }

  const updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
    console.log(email)
  }

  const updateLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
    console.log(password)
  }

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    console.log(password)
  }

  const updateConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmation(e.target.value)
    console.log(password)
  }

  // Hnadle wrong user input
  const handleError = () => {
    setErrorMessage("Some information is missing or incorrect")
  }

  const highlightInput = (errors: Array<String>) : void => {
    errors.forEach(el => {
      const input = document.querySelector<HTMLElement>(`#${el}`);
      if (input) {
        input.style.borderColor = 'red';
      }
    })
  }


  // Handle form sumbission
  const submitForm = (e:any) => {
    e.preventDefault();
    const userData:UserData = {
      email,
      firstName,
      lastName,
      password,
      confirmation
    }
    console.log("user data from front end ", userData);

    const errors: Array<string> = [];
    // for (const el in userData){
    //   if (userData[el as keyof UserData].length === 0) {
    //     errors.push(el)
    //   }
    // }
    // if (errors.length > 0) {
    //   handleError();
    //   highlightInput(errors);
    // }
    fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(userData),
    })
    .then(res => res.json())
    .then((result) => {
      console.log('email form login:', result);
      if (result.errMessage) {
        handleError();
        highlightInput(result.errors);
      }
      else {
        console.log('user info:', result);
      }
    });
  }



  return (
    <div>
      Register
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
        <label htmlFor="firstName">First name</label><br></br>
        <input 
          type="text" 
          id="firstName" 
          name="firstName"
          onChange={updateFirstName}
          >
        </input>
        <br></br>
        <label htmlFor="lastName">Last name</label><br></br>
        <input 
          type="text" 
          id="lastName" 
          name="lastName"
          onChange={updateLastName}
          >
        </input>
        <br></br>
        <label htmlFor="password">Password</label><br></br>
        <input 
          type="text" 
          id="password" 
          name="password"
          onChange={updatePassword}
          >
        </input>
        <br></br>
        <label htmlFor="confirmation">Confirm password</label><br></br>
        <input 
          type="text" 
          id="confirmation" 
          name="confirmation"
          onChange={updateConfirmation}
          >
        </input>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>
      <div className="errorMessage">{errorMessage}</div>
      <button onClick={swapAuthView}>Login</button>
    </div>
  )
}

export default Register;