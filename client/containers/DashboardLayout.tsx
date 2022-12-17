import React from 'react';

const DashBoardLayout = () => {
    return (
        <div className='dashboard-layout'>
            <div className='dashboard-nav'>
                <header>
                    <a href='#!' className='menu-toggle'>
                        <i className='fas fa-bars'></i>
                    </a>
                    <a href='#' className='brand-logo'>
                        <i className='fas fas fa-window'></i>
                        <span>Nimbus</span>
                    </a>
                </header>
                <nav className="dashboard-nav-list">
                    {<Home/>}
                </nav>
            </div>
        </div>
    )
}

export default DashBoardLayout;