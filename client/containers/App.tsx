import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserAuth from './UserAuth';
import UserDashboard from './UserDashboard';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleUserLogin = () => {
    setUserLoggedIn((userLoggedIn) => !userLoggedIn);
  };

  return (
    <div className='app'>
      {userLoggedIn ? (
        <UserDashboard handleUserLogin={handleUserLogin}/>
      ) : (
        <UserAuth handleUserLogin={handleUserLogin} />
      )}
    </div>
  );
};

export default App;
