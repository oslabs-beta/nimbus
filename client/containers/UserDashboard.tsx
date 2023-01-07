import { request } from 'http';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../components/Home';
import Functions from '../components/Functions';
import Logs from '../components/Logs';
import Apis from '../components/Apis';
import Settings from '../components/Settings';

// Conditional rendering of components: Home, Functions, Logs, APIs, Settings
const UserDashboard = () => {
  return (
    <>
      <Router>
        <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center py-12 relative">
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='functions' element={<Functions />}></Route>
              <Route path='logs' element={<Logs />}></Route>
              <Route path='apis' element={<Apis />}></Route>
              <Route path='settings' element={<Settings />} ></Route>
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
    </> 
  );
};

export default UserDashboard;
