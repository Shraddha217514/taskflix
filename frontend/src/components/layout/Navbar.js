// src/components/layout/Navbar.js
import React, { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <div className="navbar__brand">
          <span className="navbar__logo">DailyList</span>
          <span className="navbar__divider" />
          <span className="navbar__tagline">SHRADDHA'S List</span>
        </div>
        <div className="navbar__right">
          <span className="navbar__dot" />
          <span className="navbar__status"></span>
        </div>
      </div>
    </nav>
  );
}
