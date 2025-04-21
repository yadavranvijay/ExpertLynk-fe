import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socialLogin } from "../../redux/slice/authSlice";
import { notification } from "antd";
import axios from "axios";

const fetchIpData = async () => {
  const storedIpData = localStorage.getItem("ip_details");

  if (storedIpData) {
    return JSON.parse(storedIpData);
  }

  try {
    const response = await axios.get("https://ipapi.co/json/");
    const ipData = response.data;
    localStorage.setItem("ip_details", JSON.stringify(ipData));
    return ipData;
  } catch (error) {
    console.error("Failed to fetch IP data:", error);
    return null;
  }
};

function AppleLogin({ disabled}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
    script.async = true;
    script.onload = () => {
      window.AppleID.auth.init({
        clientId: 'com.websamp.applelogin',
        scope: 'name email',
        redirectURI: 'https://www.websamp.com/',
        usePopup: true
      });
    };
    document.body.appendChild(script);
    fetchIpData();
  }, []);

  const handleSignIn = async () => {
    try {
      const response = await window.AppleID.auth.signIn();
      const ipData = JSON.parse(localStorage.getItem("ip_details"));
      const loginData = {
        provider: "APPLE",
        data: { id_token: response.authorization.id_token,code:response.authorization.code },
        ip_data: ipData,  
      };
      await dispatch(socialLogin(loginData));

      notification.success({ message: "Login successful" });
    } catch (error) {
      console.error('Apple Sign-in failed:', error);
      notification.error({ message: "Error during login" });
    }
  };

  return (
    <>
      <button className="login-btn" disabled={disabled} onClick={handleSignIn}>
        <span>
          <img src="./images/login3.png" alt="Apple" />
        </span>
        Continue with Apple
      </button>
    </>
  );
}

export default AppleLogin;
