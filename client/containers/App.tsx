import React, { useState , useCallback} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Theme } from 'react-daisyui'
import UserAuth from './UserAuth';
import UserDashboard from './UserDashboard';
import HeadBar from '../components/HeadBar'

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [theme, setTheme] = React.useState('myThemeDark');
  
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'myThemeDark' ? 'myThemeLight' : 'myThemeDark');
  }, [theme]);

  const handleUserLogin  = useCallback(() => {
    setUserLoggedIn((userLoggedIn) => !userLoggedIn);
  }, [userLoggedIn]);

  
  // If user is logged in, render UserDashboard component, otherwise render UserAuth component
  return (
    <Theme dataTheme={theme}>
      <HeadBar toggleTheme={toggleTheme} theme={theme}/>
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
