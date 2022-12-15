import React, { useState } from "react";

import Login from "../components/Login.js";
import Register from "../components/Register.js";

interface Props {
  handleUserLogin: () => void;
}

const UserAuth: React.FC<Props> = ({ handleUserLogin }: Props) => {
  const [showLogin, setShowLogin] = useState(true);

  const swapAuthView = () => {
    setShowLogin((showLogin) => !showLogin);
  }

  return (
    <div className="user-auth">
      {showLogin === true ? <Login handleUserLogin={handleUserLogin} swapAuthView={swapAuthView}/> : <Register handleUserLogin={handleUserLogin} swapAuthView={swapAuthView}/>}
    </div>
  )
}

export default UserAuth;
