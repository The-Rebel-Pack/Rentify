import './Nav.css';
import React, { useContext } from 'react'
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import NavRouter from '../../routers/NavRouter';
import NavLogin from '../authentication/NavLogin';
import Search from '../listings/Search';

const Nav = () => {
    const { auth } = useContext(AuthContext)

    return (
        <NavRouter>
            <header className='header'>
                <h1 className='header__title'>Rentify</h1>
                {auth && <>
                    <p><Link to={`/listings/create`} ><button className='button'>Create new listing</button></Link></p></>}
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
                <Search />
            </header>
        </NavRouter>
    )
}

export default Nav
