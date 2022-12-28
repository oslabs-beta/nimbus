import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Theme } from 'react-daisyui'
import UserAuth from './UserAuth';
import UserDashboard from './UserDashboard';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [theme, setTheme] = React.useState('myThemeDark');

  const handleUserLogin = () => {
    setUserLoggedIn((userLoggedIn) => !userLoggedIn);
  };

  const toggleTheme = () => {
    setTheme(theme === 'myThemeDark' ? 'myThemeLight' : 'myThemeDark');
  };

  return (
    <Theme dataTheme={theme}>
      <div className='app'>
        {userLoggedIn ? (
          <UserDashboard handleUserLogin={handleUserLogin} toggleTheme={toggleTheme}/>
        ) : (
          <UserAuth handleUserLogin={handleUserLogin} toggleTheme={toggleTheme}/>
        )}
      </div>
    </Theme>
    
  );
};

export default App;
