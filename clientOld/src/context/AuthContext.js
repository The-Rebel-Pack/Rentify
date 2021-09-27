import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [auth, setAuth] = useState(window.localStorage.getItem('auth') === 'true' || false);
    const [token, setToken] = useState(null);

    const value = {
        auth,
        setAuth,
        token,
        setToken
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
