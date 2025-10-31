import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to main landing page after 5 seconds
    const navigationTimer = setTimeout(() => {
      navigate('/home');
    }, 5000);

    return () => {
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="welcome-screen">
      <div className="welcome-text">
        🙏 Namaste,<br />Welcome to Medi Sage
      </div>
    </div>
  );
};

export default Welcome;
