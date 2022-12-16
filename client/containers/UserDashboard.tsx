import { request } from 'http';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

interface FetchHeader {
  headers: {
    'Content-Type': string,
    authorization: {
      accessToken: string,
      refreshToken: string
    }
  }
}

interface Props {
  handleUserLogin: () => void;
}

const UserDashboard: React.FC<Props> = ({ handleUserLogin }: Props) => {
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
        'authorization': `BEARER ${localStorage.getItem('accessToken')}`,
        'refresh': `BEARER ${localStorage.getItem('refreshToken')}`,
      }
   });
   const res = await data.json();
   console.log(res, "RESPONSE FROM VERIFYING")
   if (!res.accessToken) {
    handleUserLogin();
   }
   console.log(res);
   setData(res);
  }
  return (
    <div>
    <button onClick={getData}>DO I HAVE TOKEN</button>
    {/* // <BrowserRouter>
    //   <Routes>
    //     <Route path='/home'></Route>
    //     <Route path='/functions'></Route>
    //     <Route path='/logs'></Route>
    //     <Route path='/apis'></Route>
    //     <Route path='/settings'></Route>
    //   </Routes>
    // </BrowserRouter> */}
    <div>Dashboard</div>
    </div>
  );
};

export default UserDashboard;
