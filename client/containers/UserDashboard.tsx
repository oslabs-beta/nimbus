import { request } from 'http';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../components/Home';
import Functions from '../components/Functions';
import Logs from '../components/Logs';
import Apis from '../components/Apis';
import Settings from '../components/Settings';

interface FetchHeader {
  headers: {
    'Content-Type': string;
    authorization: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

interface Props {
  handleUserLogin: () => void;
  toggleTheme: () => void;
}

const UserDashboard: React.FC<Props> = ({ handleUserLogin, toggleTheme }: Props) => {
  const [data, setData] = useState([]);
  //   const swapAuthView = () => {
  //     setShowLogin((showLogin) => !showLogin);
  //   }

  const getData = async () => {
    // const refreshToken = localStorage.getItem('refreshToken')
    // if (refreshToken) request.setHeader('refresh', `BEARER ${refreshToken}`);
    const data = await fetch('/verifyToken', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON',
        authorization: `BEARER ${localStorage.getItem('accessToken')}`,
        refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
      },
    });
    const res = await data.json();
    console.log(res, 'RESPONSE FROM VERIFYING');
    if (!res.accessToken) {
      handleUserLogin();
    }
    console.log(res);
    setData(res);
  };
  return (
    <>
      <button onClick={getData}>DO I HAVE TOKEN</button>
      <button onClick={toggleTheme} className="btn">Theme</button>
      <Router>
        <Layout />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='functions' element={<Functions />}></Route>
          <Route path='logs' element={<Logs />}></Route>
          <Route path='apis' element={<Apis />}></Route>
          <Route path='settings' element={<Settings />} ></Route>
        </Routes>
      </Router>
    </> 
  );
};

export default UserDashboard;
