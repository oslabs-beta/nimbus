import React, { useState } from 'react';

interface Props {
    toggleTheme: () => void;
    theme: String;
}

// HeadBar component
const HeadBar: React.FC<Props> = ({ toggleTheme, theme }: Props) => {

    const [checked, setChecked] = useState(false);

    // Toggle theme (light/dark)
    const handleToggle = () => {
        toggleTheme();
        setChecked(prev => !prev);
    }
    
    return (
        <div className="navbar bg-primary flex-row justify-between">
            <a className="btn btn-ghost normal-case text-xl">nimbus</a>
            <div className="form-control">
                
                <label className="label cursor-pointer">
                    <span className="label-text">{theme === 'myThemeDark' ? 'Light' : 'Dark'}</span> 
                    <input type="checkbox" className="toggle ml-2" checked={checked} onClick={handleToggle} />
                </label>
            </div>
        </div>
    )
    
}

export default HeadBar;