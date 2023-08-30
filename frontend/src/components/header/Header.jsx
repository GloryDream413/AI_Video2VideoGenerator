import React from 'react';
import logo from '../../assets/logo.png'
import './header.css';

const Header = () => {
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </div>
  )
}

export default Header