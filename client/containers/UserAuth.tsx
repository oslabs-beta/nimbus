import React, { useState } from "react";

import Login from "../components/Login.js";
import Register from "../components/Register.js";

interface Props {
  handleUserLogin: () => void;
  toggleTheme: () => void;
}

const UserAuth: React.FC<Props> = ({ handleUserLogin, toggleTheme }: Props) => {
  const [showLogin, setShowLogin] = useState(true);

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
