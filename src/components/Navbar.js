import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  return (
    <nav>
      <div onClick={() => setIsMenuOpen(false)} className={styles['logo']}>
        {' '}
        <Link style={{ all: 'unset' }} to="/">
          GETSOAPY
        </Link>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '37px',
        }}
      >
        <div
          style={{ fontSize: '30px' }}
          className={styles['hamburger-toggler']}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#8801;
        </div>
        <ul className={!isMenuOpen ? styles['none'] : undefined}>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/explore">Explore</Link>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/reflect">Reflect</Link>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/personal">Personal</Link>
          </li>
          <li
            onClick={() => {
              if (currentUser) {
                logout();
              }
              setIsMenuOpen(false);
            }}
          >
            <Link to="/auth">{currentUser ? 'Log Out' : 'Log In'}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
