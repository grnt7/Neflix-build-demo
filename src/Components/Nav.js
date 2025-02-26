import React,{useState,useEffect } from 'react';
import "../Components/Styles/Nav.css";


function Nav() {

  const [show, handleShow] = useState(false);

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
        <img className="nav-logo"src="/images/netflix_PNG12.png" alt=""/>
        <img className="nav-avatar"src="/images/Netflix-avatar.png" alt=""
        />
       
        </div>
        
    </div>
    
  );
}

export default Nav;