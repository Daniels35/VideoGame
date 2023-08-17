import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = ({ activePage }) => {
  return (
    <header className="header">
      <div className='headerTitle'>
        <Link to="/">PI VIDEOGAMES</Link>
      </div>
      <nav>
        <ul>
        <li>
            <Link to="/home" className={activePage === "home" ? "active" : ""}>Home</Link>
            </li>
            <li>
            <Link to="/new" className={activePage === "new" ? "active" : ""}>New</Link>
            </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
