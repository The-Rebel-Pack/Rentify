import './Nav.css';
import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import NavRouter from '../../routers/NavRouter';
import TopMenu from './TopMenu';
import Search from '../listings/Search';
import { FaBars, FaPlus } from 'react-icons/fa';

const Nav = () => {
    const { auth } = useContext(AuthContext);

    const isHidden = () => {
        const mobileMenuIcon = document.getElementsByClassName('top-menu__icon');
        return (mobileMenuIcon.offsetParent === null);
    }

    const [showMenu, setShowMenu] = useState(isHidden() ? true : false);

    const toggleShowMenu = () => {
        setShowMenu(prevShowMenu => !prevShowMenu);
    }

    return (
        <NavRouter>
            <header className='header'>
                <div className='header__top'>
                    <div className='header__top-first'>
                        <button className='button top-menu__icon button--icon' onClick={() => toggleShowMenu()}>
                            <FaBars />
                        </button>
                        <h1 className='header__title'>Rentify</h1>
                        {showMenu && <TopMenu />}
                    </div>
                    {auth && <>
                        <Link to={`/listings/create`} ><button className='button button--icon'><FaPlus /></button></Link></>}
                </div>
                <Search />
            </header>
        </NavRouter>
    )
}

export default Nav
