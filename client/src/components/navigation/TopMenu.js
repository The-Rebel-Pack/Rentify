import './TopMenu.css';
import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import NavLogin from '../authentication/NavLogin';
import { AuthContext } from '../../context/AuthContext';

const TopMenu = () => {
  const { auth } = useContext(AuthContext);

  return (
    <nav className='top-menu'>
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
  )
}

export default TopMenu



