import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import NavRouter from '../../routers/NavRouter';
import NavLogin from '../authentication/NavLogin';

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
                        <NavLogin />
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
