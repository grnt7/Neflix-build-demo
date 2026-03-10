import React, { useRef } from 'react';
import { auth } from '../firebase';
import './SignUpScreen.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { useDispatch } from 'react-redux';


function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  // const dispatch = useDispatch(); // 2. Initialize dispatc

  const register = () => {
    createUserWithEmailAndPassword(
      auth,
      emailRef.current?.value,
      passwordRef.current?.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(
      auth,
      emailRef.current?.value,
      passwordRef.current?.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSignIn = e.nativeEvent.submitter.textContent === "Sign In";

    if (isSignIn) {
      signIn();
    } else {
      register();
    }
  };

  return (
    <div className="signupScreen">
      {/* 3. Add the toggle button inside a wrapper at the top */}
      {/* <div className="loginScreen-headerButtons">
        <button 
          className="loginScreen-themeButton" 
          onClick={() => dispatch(toggleTheme())}
          type="button" 
        >
          Switch Theme
        </button>
      </div> */}
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="password" type="password" />
        <button type="submit">Sign In</button>

        <h4>
          <span className="signupScreen-grey">New to Netflix? </span>
          <span className="signupScreen-link">
           <button type="button" onClick={register}>Sign Up Now.</button>
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;

























/*
papas code:

import React, {useRef} from 'react'
import {auth} from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the correct function
import "./SignUpScreen.css";

function SignUpScreen() { 
  const emailRef = useRef(null);
  const passwordRef = useRef(null);



  const register = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    )
    .then((authUser) => {
      console.log(authUser)
    })
    .catch((error) => {
      alert(error.message);
    });
    
  };

  const signIn = (e) => {
    e.preventDefault();
  };
   



  return (
    <div className= "signupScreen">
  <form>
    <h1>Sign In</h1>
    <input ref ={emailRef} placeholder="Email" type="email"></input>
    <input ref = {passwordRef} placeholder ="password" type="password"></input>
    <button type ="submit" onClick={signIn}>Sign In</button>
    
    <h4><span className="signupScreen-grey">New to Netflix? </span>
    <span className="signupScreen-link" onClick= {register}><a href =""></a>Sign Up Now.</span></h4>
  </form>
    </div>
  ) 
}

export default SignUpScreen;





*/
