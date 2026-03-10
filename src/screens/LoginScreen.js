import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "./LoginScreen.css";
import SignUpScreen from './SignUpScreen';
//import { toggleTheme } from "../store"; // Adjust path to your store.js
import { toggleTheme } from '../features/rootReducer';

function LoginScreen() {

const [signIn, setSignIn] = useState(false);

    const dispatch = useDispatch();


  return (
    <div className= "loginScreen">
    <div className="loginscreen-background"> 
        <img className ="loginScreen-logo"
        src ="/images/Filmbuff-woodmark-logo.png" 
                  alt="Filmbuff-logo" />
              <div className="loginScreen-headerButtons">
              {/* The Theme Switcher */}
         <button 
           className="loginScreen-themeButton" 
           onClick={() => dispatch(toggleTheme())}
         >
           {/* You can even change the button text based on theme! */}
           Switch Theme
         </button>
        <button onClick={() => setSignIn(true)} className="loginScreen-button">
            Sign In
          </button>
          </div>
        <div className="loginScreen-gradient"/>
        </div>
        <div className="loginScreen-body">
            {signIn ? (
                <SignUpScreen/>
            ) : (
                <>
                <h1>Unlimited Films, TV Programmes and More</h1>
                <h2>Watch anywhere. Cancel at any time.</h2>
                <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                   
                   <div className="loginScreen-input">
                    <form>
                        <input  type ="email"
                        placeholder= "Email address"
                        />
                        <button onClick={() => setSignIn(true)} className ="loginScreen-getStarted">
                        GET STARTED</button>
                    </form>
        
        
                   </div>
                  
        
                  
                   
                   
                    </>
                    
                    
            )}
          
            
            
            </div>

       
        

                                                            
    </div>
  );
}

export default LoginScreen;


/*
 


*/