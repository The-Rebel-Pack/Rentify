import React from 'react'
import Navigation from './Navigation';
import Search from '../search/Search';
import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <Navigation />
      <Search />
    </header>
  )
}

export default Header
