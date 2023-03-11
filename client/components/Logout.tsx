import React from "react";


const Logout: React.FC = () => {
    const logOut = () => {
        fetch('/logout')
        .then(res => {
            window.location.reload();
        })
    }

    return (
        <div className="ml-4 mt-3 mb-6">
            <button className="btn btn-outline btn-sm text-sm" onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Logout;