import './Nav.css';
import React, { useState, useContext, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import NavRouter from '../../routers/NavRouter';
import TopMenu from './TopMenu';
import Search from '../listings/Search';
import { FaBars, FaPlus } from 'react-icons/fa';

const Nav = () => {
    const { auth } = useContext(AuthContext);
    const [screenWidth, setScreenWidth] = useState(window.screen.width || null);
    const [mediaScreen, setMediaScreen] = useState(window.screen.width >= 400 ? 'desktop' : 'mobile');

    const [showMenu, setShowMenu] = useState(window.screen.width >= 400 ? true : false);

    const toggleShowMenu = () => {
        setShowMenu(prevShowMenu => !prevShowMenu);
    }

    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(window.screen.width));
        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.screen.width));
        }
    }, [setScreenWidth])

    useEffect(() => {
        if (screenWidth < 400) {
            if (mediaScreen === 'mobile') {
                setShowMenu(false)
                setMediaScreen('desktop');
            }
        }
        if (screenWidth > 399) {
            if (mediaScreen === 'desktop') {
                setShowMenu(true)
                setMediaScreen('mobile');
            }
        }
    }, [screenWidth, setMediaScreen, mediaScreen])

    return (
        <NavRouter>
            <header className='header'>
                <div className='header__top'>
                    <div className='header__top-first'>
                        <button className='button top-menu__icon button--icon' onClick={() => toggleShowMenu()}>
                            <FaBars />
                        </button>
                        <NavLink to="/" >
                            <h1 className='header__title'>Rentify</h1>
                        </NavLink>
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
