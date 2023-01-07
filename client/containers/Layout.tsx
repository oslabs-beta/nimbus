import React, { useState} from 'react';
// import Link component from react router here
import { Link } from 'react-router-dom';

// Sidaber component
const Layout = () => {
  const [selectedTab, setSelectedTab] = useState('Home');

  return (
    <ul className='menu bg-neutral w-56 rounded-box lg:rounded-none h-fit lg:h-full'>
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
  );
};

export default Layout;
