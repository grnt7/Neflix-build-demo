import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import Nav from '../Components/Nav';
import '../screens/ProfileScreen.css';
import { signOut } from 'firebase/auth'; //Import signout.
import PlansScreen from './PlansScreen';


function Profilescreen() {
  const user = useSelector(selectUser);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful. Redux state will be updated in App.js
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen-body">
        <h1>Edit Profile</h1>
        <div className="profileScreen-info">
          <img src="/images/Netflix-avatar.png" alt="Avatar" />
          <div className="profileScreen-details">
            <h2>{user?.email}</h2> {/* Display user email */}
            <div className="profileScreen-Plans">
              <h3>Plans</h3>
              <PlansScreen/>
              <button  className="profileScreen-signOut" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profilescreen;





/*

<PlansScreen/>


import React from 'react'
import { useSelector } from "react-redux";
import { selectUser} from "../features/userSlice"
import { auth } from "../firebase";
import { signOut } from 'firebase/auth'; //Import signout.
import Nav from '../Components/Nav';
import "../screens/ProfileScreen.css";

function Profilescreen() {

const user = useSelector(selectUser) ;




  return (
    <div className ="profileScreen">
     <Nav/>
    <div className="profileScreen-body">
      <h1>Edit Profile</h1>
      <div className="profileScreen-info">
      <img  src="/images/Netflix-avatar.png"/>
      <div className="profileScreen-details">
        <h2>userEmail</h2>
      <div className="profileScreen-plans">
      <button onClick ={() => auth.signOut()} className="profileScreen-signOut">Sign Out</button>
      </div>

      </div>
</div>
    </div>
      </div>
  )
}

export default Profilescreen;







<h2>>user.email}</h2>
*/