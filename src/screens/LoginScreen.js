import React, {useState} from 'react';
import "./LoginScreen.css";
import SignUpScreen from './SignUpScreen';

function LoginScreen() {

const [signIn, setSignIn] = useState(false);



  return (
    <div className= "loginScreen">
    <div className="loginscreen-background"> 
        <img className ="loginScreen-logo"
        src ="https://i1.wp.com/assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
        alt=""/>
        <button onClick={() => setSignIn(true)} className="loginScreen-button">
            Sign In
        </button>
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