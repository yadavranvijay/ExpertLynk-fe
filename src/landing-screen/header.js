import React, { useState, useEffect } from "react";
import LoginButton from "./components/login-button";
import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowLoginButton(true);
    } else {
      setShowLoginButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


 const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleNavLinkClick = () => {
    setIsOpen(false); 
  };

  return (
    <div>
      <header>
        <div className="header position-relative">
          <div className="nav-top">
            <div className="container d-flex align-items-center justify-content-between position-lg-relative">
              <div className="logo-wrapper">
                <NavLink className="big-logo" to="/dashboard" onClick={handleDrawerToggle}>
                  <span className="logo-text">ExpertLynk</span>
                </NavLink>
              </div>
              <div className="d-flex align-items-center">
                <div className={isOpen ? "nav-menu open" : "nav-menu "}>
                  <ul>
                    <li>
                      <NavLink to="/about-us" onClick={handleNavLinkClick}>About Us</NavLink>
                    </li>
                    <li>
                      <NavLink to="/how-referral-works" onClick={handleNavLinkClick}>Referral</NavLink>
                    </li>
                    <li>
                      <NavLink to="/how-it-works" onClick={handleNavLinkClick}>How It Works</NavLink>
                    </li>
                    <li>
                      <NavLink to="/faq" onClick={handleNavLinkClick}>FAQ</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="bar me-4" onClick={handleDrawerToggle}>
                  <FaBarsStaggered />
                </div>
                {showLoginButton && (
                  <div className="wrapper d-flex align-items-center justify-content-end">
                    <LoginButton />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
