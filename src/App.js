import Homescreen from './screens/Homescreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen'
import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {auth} from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from './features/userSlice';
import Footer from "./Components/Footer";
import './App.css';

import AnimationScreen from './screens/AnimationScreen';

function App() {
  const theme = useSelector((state) => state.theme.themeName);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [showAnimation, setShowAnimation] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // This line "wires" the Redux state to your CSS :root[data-theme]
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged
    ((userAuth) => {
      if (userAuth) {
        //Logged in
       
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        })
      );
      // Show the animation only after a successful login
        setShowAnimation(true);
      } else {
        //Logged out
        dispatch(logout()); // Corrected dispatch: Call the action creator
         // Hide the animation if the user logs out
        setShowAnimation(false);
      }
      // Authentication check is complete
      setLoadingAuth(false);

    })
    return unsubscribe;
  }, [dispatch]); // Added dispatch to dependency array
 
  const onAnimationEnd = () => {
    // This is called by AnimationScreen when the animation is finished
    setShowAnimation(false);
  };

  if (loadingAuth) {
    // Don't render anything until Firebase has checked the user's authentication state
    return null; 
  }
  
  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <>
            <Routes>
              {showAnimation ? (
                <Route path="/" element={<AnimationScreen onAnimationEnd={onAnimationEnd} />} />
              ) : (
                <Route path="/" element={<Homescreen />} />
              )}
              <Route path="/profilescreen" element={<ProfileScreen/>} />
            </Routes>

            {/* ONLY show the Footer if the animation is finished */}
            {!showAnimation && <Footer />} 
          </>
        )}
      </Router>
      </div>
  );
}

export default App;

