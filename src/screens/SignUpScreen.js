import React, { useRef } from 'react';
import { auth } from '../firebase';
import './SignUpScreen.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="password" type="password" />
        <button type="submit">Sign In</button>

        <h4>
          <span className="signupScreen-grey">New to Netflix? </span>
          <span className="signupScreen-link">
            <button type="submit">Sign Up Now.</button>
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;


/*
import React, { useRef } from 'react';
import { auth } from '../firebase';
import './SignUpScreen.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.nativeEvent.submitter.textContent === "Sign In"){
        signIn();
    } else {
        register();
    }
  };

  const register = () => {
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
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
    // Add your sign-in logic here
    console.log("Sign In clicked");
  };

  return (
    <div className="signupScreen">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="password" type="password" />
        <button type="submit">Sign In</button>

        <h4>
          <span className="signupScreen-grey">New to Netflix? </span>
          <span className="signupScreen-link">
            <button type="submit">Sign Up Now.</button>
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;

*/






















/*
papas original code:
import React, { useRef } from 'react';
import { auth } from '../firebase';
import './SignUpScreen.css';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the correct function

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth, // Pass the auth object
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="password" type="password" />
        <button type="button" onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className="signupScreen-grey">New to Netflix? </span>
          <span className="signupScreen-link" onClick={register}>
            Sign Up Now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;



















*/
















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
