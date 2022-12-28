import React, { useState} from 'react';
import { Link } from 'react-router-dom';
// import Link component from react router here

const Layout = () => {
  const [selectedTab, setSelectedTab] = useState('Home');

  return (
    <div className='dashboard-layout'>
      <div className='dashboard-nav'>
        {/*<header>
          <div className='menu-toggle'>=</div>
          <div className='brand-logo'>Nimbus</div>
          </header>*/}
        <nav className='dashboard-nav-list'>
          <ul className='menu bg-base-100 w-56'>
            <li onClick={() => setSelectedTab('Home')}>
              <Link to='/' className={selectedTab === 'Home' ? 'active' : ''}>Home</Link>
            </li>
            <li onClick={() => setSelectedTab('Functions')}>
              <Link to='/functions' className={selectedTab === 'Functions' ? 'active' : ''}>Functions</Link>
            </li>
            <li onClick={() => setSelectedTab('Logs')}>
              <Link to='/logs' className={selectedTab === 'Logs' ? 'active' : ''}>Logs</Link>
            </li>
            <li onClick={() => setSelectedTab('APIs')}>
              <Link to='/apis' className={selectedTab === 'APIs' ? 'active' : ''}>APIs</Link>
            </li>
            <li onClick={() => setSelectedTab('Settings')}>
              <Link to='/settings' className={selectedTab === 'Settings' ? 'active' : ''}>Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
