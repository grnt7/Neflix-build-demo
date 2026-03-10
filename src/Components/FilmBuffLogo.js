import React from 'react';

const FilmBuffLogo = ({ className, onClick }) => {
  return (
    <svg 
      className={className} 
      onClick={onClick} // Pass the click event down!
      viewBox="0 0 160 40" // Correct coordinates
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
    >
      <text 
        x="0" 
        y="32" 
        fontFamily="Helvetica, Arial, sans-serif" 
        fontSize="32" 
        fontWeight="900" 
        fill="currentColor" /* THIS IS ESSENTIAL FOR THEME SWITCHING */
      >
        FilmBuff
      </text>
    </svg>
  );
};

export default FilmBuffLogo;