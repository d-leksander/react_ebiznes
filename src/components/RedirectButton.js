import React, {useContext} from 'react';
import {UserContext} from '../providers/UserProvider';

let existingWindow = null;

async function authenticate(provider, queryParams) {
    return fetch(
        "http://localhost:9000/authenticate/" + provider + "?" + queryParams,
        {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }
    )
        .then((response) => {
            if (response.status >= 400 && response.status < 600) {
                throw new Error('Bad response from server');
            }
            return response.json();
        })
        .then((user) => {
            return user;
        })
        .catch(function (response) {
            console.log('Error');
            console.log(response);
        });
}


export default function RedirectButton({provider, title}) {
    const {setUser} = useContext(UserContext);

    function handleAuthentication() {
        window.socialProviderCallback = async function (socialProvider, queryParams) {
            let user = await authenticate(socialProvider, queryParams);
            setUser(user);
        };

        existingWindow = window.open(
            `http://localhost:9000/authenticate/${provider}`,
            'Authentication'
        );
    }

    return (
        <button className={`defaultButton ${provider}Login`}
                onClick={handleAuthentication}>
            {title}
        </button>
    );
}