import './Nav.css';
import React, { useContext } from 'react'
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import NavRouter from '../../routers/NavRouter';
import NavLogin from '../authentication/NavLogin';
import Search from '../listings/Search';
import { FaBars } from 'react-icons/fa';

const Nav = () => {
    const { auth } = useContext(AuthContext)

    return (
        <NavRouter>
            <header className='header'>
                <h1 className='header__title'>Rentify</h1>
                {auth && <>
                    <p><Link to={`/listings/create`} ><button className='button'>Create new listing</button></Link></p></>}
                <nav className='top-menu '>
                    <button className='button top-menu__icon'><FaBars /></button>
                    <ul>
                        <li className='top-menu__item'>
                            <NavLink to="/" >
                                Listings
                            </NavLink>
                        </li>
                        <li className='top-menu__item'>
                            <NavLink to="/" >
                                About
                            </NavLink>
                        </li>
                        {auth &&
                            <li className='top-menu__item'>
                                <NavLink to="/profile" >
                                    Profile
                                </NavLink>
                            </li>
                        }
                        <li className='top-menu__item'>
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
