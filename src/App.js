import Homescreen from './screens/Homescreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen'
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {auth} from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout,selectUser } from './features/userSlice';
import './App.css';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
      } else {
        //Logged out
        dispatch(logout()); // Corrected dispatch: Call the action creator
      }

    })
    return unsubscribe;
  }, [dispatch]); // Added dispatch to dependency array
 
  
  
  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
        <Routes>
          <Route path="/test" element={<h1>Wow! Whats up#Papaddog</h1>} />
          <Route path="/loginscreen" element={<LoginScreen/>} />
          <Route path="/profilescreen" element={<ProfileScreen/>} />
          <Route path="/" element={<Homescreen />} />
        </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;

