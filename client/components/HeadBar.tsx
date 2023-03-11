import React, { useState, useCallback } from 'react';
import { HeadBarProps } from "../types";
import Logout from '../components/Logout';

const HeadBar: React.FC<HeadBarProps> = ({ toggleTheme, theme }: HeadBarProps) => {

    const [checked, setChecked] = useState(false);

    // Toggle theme (light/dark)
    const handleToggle =  () => {
        toggleTheme();
        setChecked(prev => !prev);
    };
    
    return (
        <div className="navbar bg-secondary flex-row justify-between shadow-md">
            {/* <a className="btn btn-ghost normal-case text-xl">nimbus </a> */}
            <div>
                <img src={require("../../assets/cloud.png").default} className="w-12 ml-3" />
                {theme === 'myThemeDark' ? 
                <img src={require("../../assets/nimbus3.png").default} className="w-28 ml-1"/> : <img src={require("../../assets/nimbus.png").default} className="w-28 ml-1"/>}

            </div>
            <div className="form-control flex-row">
                <label className="label cursor-pointer">
                    <span className="label-text">{theme === 'myThemeDark' ? 'Dark' : 'Light'}</span> 
                    <input type="checkbox" className="toggle ml-2" checked={checked} onClick={handleToggle} />
                </label>
            </div>
        </div>
    )
    
}

export default HeadBar;