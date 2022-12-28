import React from 'react';
import { Link } from 'react-router-dom';
// import Link component from react router here

const Layout = () => {
  return (
    <div className='dashboard-layout'>
      <div className='dashboard-nav'>
        {/*<header>
          <div className='menu-toggle'>=</div>
          <div className='brand-logo'>Nimbus</div>
          </header>*/}
        <nav className='dashboard-nav-list'>
          <ul className='menu bg-base-100 w-56 rounded-box'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/functions'>Functions</Link>
            </li>
            <li>
              <Link to='/logs'>Logs</Link>
            </li>
            <li>
              <Link to='/apis'>APIs</Link>
            </li>
            <li>
              <Link to='/settings'>Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
