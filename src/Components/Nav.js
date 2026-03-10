import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../Components/Styles/Nav.css";
import FilmBuffLogo from './FilmBuffLogo'; // Import your new logo component

function Nav() {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);
        return () => window.removeEventListener("scroll", transitionNavbar);
    }, []);

    const handleNavigation = (path) => {
      navigate(path);
    };

    return (
<div className={`nav ${show && "nav_black"}`}>
        <div className="nav-contents">
            {/* The Old broken <img> is gone. Use your component here! */}
            <FilmBuffLogo 
                className="nav_logo" 
                onClick={() => handleNavigation('/')}
                title="Return Home" // Replaces 'alt' for SVGs
            />

            <img
                onClick={() => handleNavigation('/profilescreen')}
                className="nav-avatar"
                src="/images/Netflix-avatar.png"
                alt="Profile Avatar"
            />
        </div>
    </div>
);
}

export default Nav;























/*
original papa code
import React,{useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../Components/Styles/Nav.css";


function Nav() {

  const [show, handleShow] = useState(false);

  const navigate = useNavigate()

  const transitionNavbar = () => {
        if (window.scrollY > 100) {
          handleShow(true);
        } else  {
          handleShow(false);
        }
  };

      useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);
        return () => window.removeEventListener("scroll", transitionNavbar)
      },[]);

  return (
    <div className={`nav ${show && "nav_black"}`}>
        <div className ="nav-contents">
        <img onClick ={( ) =>
          navigate('/')} 
        className="nav-logo"
        src="/images/netflix_PNG12.png" alt=""/>
        <img onClick = {( ) =>
          navigate('/profilescreen')}  
      
        className="nav-avatar"
        src="/images/Netflix-avatar.png" alt=""
        />
       
        </div>
        
    </div>
    
  );
}

export default Nav;









////////gemini 
  import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../Components/Styles/Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);
        return () => window.removeEventListener("scroll", transitionNavbar);
    }, []);

    const handleNavigation = (path) => {
      navigate(path);
    };

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <div className="nav-contents">
                <img
                    onClick={() => handleNavigation('/')}
                    onTouchEnd={() => handleNavigation('/')}
                    className="nav-logo"
                    src="/images/netflix_PNG12.png"
                    alt=""
                />
                <img
                    onClick={() => handleNavigation('/profilescreen')}
                    onTouchEnd={() => handleNavigation('/profilescreen')}
                    className="nav-avatar"
                    src="/images/Netflix-avatar.png"
                    alt=""
                />
            </div>
        </div>
    );
}

export default Nav;

*/