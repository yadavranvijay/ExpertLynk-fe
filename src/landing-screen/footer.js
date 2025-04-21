import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-top">
    <div className="container footer-contaner py-4 ">
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-6 ">
          <div>
            <div className="footer-logo">
                <img src="./logo/websamp2.png" alt="" />
            </div>
            <p>
            Websamp connects brands with consumers through surveys. Brands get feedback, consumers earn rewards.
            </p>
          </div>
         
        </div>
     
        <div className="col-lg-3 col-md-4 col-sm-6 offset-lg-2">
          <h3>Main menu</h3>
          <ul className="ps-0 hoverable">
            <li>
              <NavLink to="/term-service">Term Service </NavLink>
            </li>
            <li>
              <NavLink to="/privacy-policy">Privacy Policy </NavLink>
            </li>
            <li>
              <NavLink to="/about-us">About Us </NavLink>
            </li>
          
          </ul>
        </div>
    
        <div className="col-lg-3 col-md-4 col-sm-6">
          <h3>Help</h3>
          <ul className="ps-0 hoverable">
            <li>
            <NavLink to="/faq">
              FAQ
            </NavLink> 
            </li>
            
            
          
          </ul>
           
        </div>
      </div>
    </div>
    <div className="copyright py-2">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="mb-0 text-center">
            © 2024 - Continuum Insights 
            </p>
          </div>
        </div>
      </div>
    </div>
    </footer>
  )
}

export default Footer
