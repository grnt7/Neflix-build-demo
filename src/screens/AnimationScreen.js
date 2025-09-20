import React, {useEffect} from 'react'
import Lottie from "lottie-react";
import NetflixAnimation from "../lottie/NetflixAnimation.json"

const AnimationScreen = ({ onAnimationEnd }) => {
  // Use a useEffect hook to handle the animation end
  useEffect(() => {
    // Set a timeout to call the onAnimationEnd prop after 5 seconds
    const timer = setTimeout(() => {
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    }, 5000); // 5000 milliseconds for the animation to play

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  const styles = {
    animationContainer: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    animation: {
      width: '100%',
      maxWidth: '500px',
    },
  };

  return (
    <div style={styles.animationContainer}>
      <Lottie animationData={NetflixAnimation} loop={false} style={styles.animation} />
    </div>
  );
};

export default AnimationScreen;
