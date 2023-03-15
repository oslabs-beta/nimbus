import { request } from 'http';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../components/Home';
import Functions from '../components/Functions';
import Logs from '../components/Logs';
import Apis from '../components/Apis';
import Settings from '../components/Settings';
import Logout from '../components/Logout'
import { UserAuthProps, FetchHeader} from "../types";

const UserDashboard: React.FC<UserAuthProps> = ({ handleUserLogin, toggleTheme }: UserAuthProps) => {

  const routes = {
    userDetails: '/dashboard/settings/userDetails',
  }

  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [arn, setArn] = useState('');
  const [region, setRegion] = useState('');

  const getUserDetails = useCallback(async () => {
    let res;
    try {
      res = await fetch(`${routes.userDetails}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
      });
      // convert response to JS object
      res = await res.json();
      setEmail(res.email);
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setArn(res.arn);
      setRegion(res.region);
    } catch (err) {
      console.log(err);
    }
  }, [email, firstName, lastName, arn, region]);

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Router>
        <div className="drawer drawer-mobile z-0">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center pb-12 pt-6 relative">
            <Routes>
              <Route path='/' element={<Home firstName={firstName}/>}></Route>
              <Route path='functions' element={<Functions />}></Route>
              <Route path='logs' element={<Logs />}></Route>
              <Route path='apis' element={<Apis />}></Route>
              <Route path='settings' element={<Settings 
              email={email}
              firstName={firstName}
              lastName={lastName}
              password={password}
              confirmation={confirmation}
              arn={arn}
              region={region}
              setEmail={setEmail}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPassword={setPassword}
              setConfirmation={setConfirmation}
              setArn={setArn}
              setRegion={setRegion}
              />} >
              </Route>
            </Routes>
            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle drawer-button lg:hidden absolute left-2 top-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
          </div> 
          <div className="drawer-side lg:bg-gray-800">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
            <Layout />
          </div>
        </div>
      </Router>
      <div className="hidden ml-4 mt-3 mb-6 lg:block lg:fixed lg:bottom-2 z-10">
          <Logout />
      </div>
    </> 
  );
};

export default UserDashboard;
