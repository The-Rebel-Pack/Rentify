import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import NavRouter from '../../routers/NavRouter';

const Nav = () => {
    const { isAuth } = useContext(AuthContext)

    return (
        <NavRouter>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" >
                            Listings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout" >
                            Logout
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" >
                            Register
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </NavRouter>
    )
}

export default Nav
