import React, {useEffect, useState}from "react";
import "./Styles/MenuBar.css";

const MenuBar = ()  => {
    const [show, handleShow] = useState(false);

    const transitionMenuBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        }else {
            handleShow(false);
        }
    };

    useEffect(() => {
       window.addEventListener("scroll", transitionMenuBar);
       return () => window.removeEventListener("scroll", transitionMenuBar)
    },[]);


    return (
        
    <div className= {`Menu-Bar ${show && `Menu-Black`}`}>
    <div className = "Menu-Bar-Contents">
        <img src ="/images/NetflixyLogo.png" alt ="Netflixy Logo"  className ="MenuBar-logo"/>
        <img src ="/images/Netflixavatar.jpg" alt="MenuBar-avatar" className="MenuBar-avatar"/>
       
    </div>
    </div>
    )
}

export default MenuBar;