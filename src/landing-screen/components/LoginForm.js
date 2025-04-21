import React, { useState } from "react";
import LinkedInOAuth from "./LinkdingLoginnew";
import CustomButton from "./customlogin";
import { NavLink } from "react-router-dom";
import AppleLogin from "./AppleLogin";
import TwitterOauthButton from "./Twitter";
import { Divider } from "antd";


const LoginForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
    setErrorMessage("");
  };

  const handleCardClick = () => {
    console.log("click");
    if (!isChecked) {
      setErrorMessage("Please agree to the terms by checking the checkbox.");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="log-form" onClick={handleCardClick}>
      <div className="form-check d-flex align-items-center ps-0">
        <input
          className="form-check-input ms-0"
          type="checkbox"
          id="flexCheckDefault"
          checked={isChecked}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
        />
        <label className="error-message ms-4" htmlFor="CheckDefault">
          I agree to the <NavLink to="/term-service">Terms</NavLink> of Use and
          to receive marketing email messages from Websamp, and I accept the{" "}
          <NavLink to="/privacy-policy">Privacy Policy</NavLink>.
        </label>
      </div>
      {errorMessage && (
        <div className="error-message text-danger mt-2">{errorMessage}</div>
      )}

      {!isChecked ? (
        <div className="login-btns-wrapper mt-5">
          <button className="login-btn" onClick={handleCardClick}>
            <span>
              <img src="./images/login1.png" alt="Google" />
            </span>{" "}
            Continue with Google
          </button>
          <button className="login-btn" onClick={handleCardClick}>
            <span>
              <img src="./images/login3.png" alt="Apple" />
            </span>
            Continue with Apple
          </button>
          <Divider>OR</Divider>
          <button className="login-btn" onClick={handleCardClick}>
            <span>
              <img src="./images/login2.png" alt="LinkedIn" />
            </span>
            Continue with LinkedIn
          </button>
          <button className="login-btn" onClick={handleCardClick}>
            <span>
              <img src="./images/twitter.png" alt="Twitter" />
            </span>{" "}
            Continue with Twitter
          </button>
        </div>
      ) : (
        <div className="login-btns-wrapper mt-5">
          <CustomButton disabled={!isChecked} onClick={handleCardClick} />
          <AppleLogin disabled={!isChecked} onClick={handleCardClick} />
          <Divider>OR</Divider>
          <LinkedInOAuth disabled={!isChecked} onClick={handleCardClick} />
          <TwitterOauthButton disabled={!isChecked} onClick={handleCardClick} />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
