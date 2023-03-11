import React from "react";


const Logout: React.FC = () => {
    const logOut = () => {
        fetch('/logout')
        .then(res => {
            window.location.reload();
        })
    }

    return (
        <div>
            <button className="btn btn-outline" onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Logout;