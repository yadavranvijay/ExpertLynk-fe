import React, { useState, useEffect } from 'react';
import './flip.css';


const FlippingBanner = () => {
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFlip(prevFlip => !prevFlip);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="app">
        <div className="banner-container">
          <div className={`flip-card ${flip ? "flipped" : ""}`}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="./images/Flip_Banner_11.png" alt="Banner 1" />
              </div>
              <div className="flip-card-back">
                <img src="./images/Flip_Banner_12.png" alt="Banner 2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default FlippingBanner;
