import React, { useState } from "react";

import Login from "../components/Login.js";
import Register from "../components/Register.js";

const UserAuth = () => {
  const [showLogin, setShowLogin] = useState(true);

  const swapAuthView = () => {
    setShowLogin((showLogin) => !showLogin);
  }

  return (
    <div className="user-auth">
      {showLogin === true ? <Login swapAuthView={swapAuthView}/> : <Register swapAuthView={swapAuthView}/>}
    </div>
  )
}

export default UserAuth;
