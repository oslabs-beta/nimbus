import React, { useState, useCallback } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { UserAuthProps } from "../types";

// UserAuth component, displays login or register component depending on state
const UserAuth: React.FC<UserAuthProps> = ({ handleUserLogin, toggleTheme }: UserAuthProps) => {
  const [showLogin, setShowLogin] = useState(true);

  // Swap between login and register views
  const swapAuthView = useCallback(() => {
    setShowLogin((showLogin) => !showLogin);
  }, [showLogin]);

  return (
    <div className="user-auth hero min-h-screen bg-base-200">
      {showLogin === true ? <Login handleUserLogin={handleUserLogin} swapAuthView={swapAuthView}/> : <Register handleUserLogin={handleUserLogin} swapAuthView={swapAuthView}/>}
    </div>
  )
}

export default UserAuth;
