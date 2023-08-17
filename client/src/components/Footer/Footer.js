import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Desarollado por Daniel Diaz</p>
      <p>HENRY</p>
      <p>© {year}</p>
    </footer>
  );
}

export default Footer;
