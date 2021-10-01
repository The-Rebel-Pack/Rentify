import React from 'react'
import { NavLink } from "react-router-dom";
import { FaBars } from 'react-icons/fa';

const Navigation = () => {
  return (
    <div className='header__top'>
      <div>
        <button className='button top-menu__icon button--icon'>
          <FaBars />
        </button>
        <NavLink to="/" >
          <h1 className='header__title'>Rentify</h1>
        </NavLink>
        {/* {showMenu && <TopMenu />} */}
      </div>
    </div>
  )
}

export default Navigation
