import React, {createContext, useCallback, useState} from 'react';

export const UserContext = createContext(null);

export default function UserProvider({children}) {
    const [user, setUser] = useState(() => {
        const userString = window.localStorage.getItem("userData");

        return userString ? JSON.parse(userString) : null;
    });
    const handleSetUser = useCallback(
        (userData) => {
            if (userData) {
                window.localStorage.setItem("userData", JSON.stringify(userData));
            } else {
                window.localStorage.removeItem("userData");
            }

            setUser(userData);
        },
        [setUser]
    );

    return (
        <UserContext.Provider value={{user, setUser: handleSetUser}}>
            {children}
        </UserContext.Provider>
    );
}