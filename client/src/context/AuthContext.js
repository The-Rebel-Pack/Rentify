import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [isAuth, setIsAuth] = useState({
        user: null,
        token: null,
        loading: false,
        errorMessage: null
    })

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
