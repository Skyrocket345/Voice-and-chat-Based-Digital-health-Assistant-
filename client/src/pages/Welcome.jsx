import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Shuffle from '../components/Shuffle';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    // Show subtext after shuffle animation completes
    const subtextTimer = setTimeout(() => {
      setShowSubtext(true);
    }, 1500);

    // Navigate to main landing page after 4.5 seconds
    const navigationTimer = setTimeout(() => {
      navigate('/home');
    }, 4500);

    return () => {
      clearTimeout(subtextTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <Shuffle
          text="🙏 Namaste"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.03}
          threshold={0.1}
          triggerOnce={true}
          triggerOnHover={false}
          respectReducedMotion={true}
          className="namaste-text"
          tag="h1"
        />
        {showSubtext && (
          <p className="welcome-subtext fade-in">
            Welcome to MediSage
          </p>
        )}
      </div>
      
      {/* Animated background gradient */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
    </div>
  );
};

export default Welcome;
