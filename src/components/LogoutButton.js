import React, {useContext} from 'react';
import {UserContext} from '../providers/UserProvider';

function signOut(user) {
    fetch("http://localhost:9000/api/signOut", {
        method: "GET",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'X-Auth-Token': user?.token
        }
    });
}

export default function LogoutButton() {
    const {user, setUser} = useContext(UserContext);

    function handleLogOut() {
        signOut(user);
        setUser(undefined);
    }

    return (
        <button className="back" onClick={handleLogOut}>
            Logout
        </button>
    )
}