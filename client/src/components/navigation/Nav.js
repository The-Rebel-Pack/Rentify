import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import NavRouter from '../../routers/NavRouter';
import NavLogin from '../authentication/NavLogin';

const Nav = () => {
    const { auth } = useContext(AuthContext)

    return (
        <NavRouter>
            <h1>Rentify</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" >
                            Listings
                        </NavLink>
                    </li>
                    {auth &&
                        <li>
                            <NavLink to="/profile" >
                                profile
                            </NavLink>
                        </li>
                    }
                    <li>
                        <NavLogin />
                    </li>
                </ul>
            </nav>
        </NavRouter>
    )
}

export default Nav
