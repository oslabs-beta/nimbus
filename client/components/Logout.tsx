import React from "react";

const Logout: React.FC = () => {
    const logOut = () => {
        fetch('/logout')
        .then(res => {
            window.location.reload();
        })
    }

    return (
        <>
            <button className="btn btn-outline btn-sm text-sm" onClick={logOut}>Log Out</button>
        </>
    )
}

export default Logout;