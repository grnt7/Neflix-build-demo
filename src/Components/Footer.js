import React, { useState, useEffect } from 'react';
import "./Styles/Footer.css";

function Footer() {
  const [isOriginal, setIsOriginal] = useState(false);

    useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsOriginal(savedTheme === 'original');
  }
}, []);

const toggleTheme = () => {
  const newTheme = !isOriginal ? 'original' : '';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme); // Saves the choice to the browser
  setIsOriginal(!isOriginal);
};

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__attribution">
          Data provided by TMDB. This is a portfolio project.
        </p>
        
        <button className="theme__toggle" onClick={toggleTheme}>
          {isOriginal ? "Switch to Homage Theme" : "Switch to Original Design"}
        </button>
      </div>
    </footer>
  );
}

export default Footer;