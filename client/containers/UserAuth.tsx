import React, { useState } from "react";

import Login from "../components/Login.js";
import Register from "../components/Register.js";

interface Props {
  handleUserLogin: () => void;
  toggleTheme: () => void;
}

// UserAuth component, displays login or register component depending on state
const UserAuth: React.FC<Props> = ({ handleUserLogin, toggleTheme }: Props) => {
  const [showLogin, setShowLogin] = useState(true);

  // Swap between login and register views
  const swapAuthView = () => {
    setShowLogin((showLogin) => !showLogin);
  }

  return (
    <div className="user-auth hero min-h-screen bg-base-150">
      {/*<button onClick={toggleTheme} className="btn">Theme</button>*/}
      {showLogin === true ? <Login handleUserLogin={handleUserLogin} swapAuthView={swapAuthView}/> : <Register handleUserLogin={handleUserLogin} swapAuthView={swapAuthView}/>}
    </div>
  )
}

export default UserAuth;
