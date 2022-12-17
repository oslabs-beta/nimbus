import { request } from 'http';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoardLayout from './DashboardLayout' 

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
    <>
    <button onClick={getData}>DO I HAVE TOKEN</button>
     <Router>
        <Routes>
          <Route path='/' element={<DashBoardLayout/>}>
           <Route index element={<Home/>}></Route>
           {/* <Route path='/functions' element={<Functions/>}></Route>
           <Route path='/logs' element={<Logs/>}></Route>
           <Route path='/apis' element={<Apis/>}></Route>
           <Route path='/settings' element={<Settings/>}></Route> */}
          </Route>
        </Routes>
     </Router>
    </>
  );
};

export default UserDashboard;
