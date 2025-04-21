import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
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

const LINKEDIN_CLIENT_ID = "77psoqz3idbloz";
const LINKEDIN_CALLBACK_URL = "https://www.websamp.com/";
const linkedinOAuthURL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_CALLBACK_URL}&scope=openid%20profile%20email`;

const LinkedInOAuth = ({ disabled, onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth);

  useEffect(() => {
    fetchIpData();
  }, []);
  useEffect(() => {
    if (authStatus.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [authStatus.isLoggedIn, navigate]);
  const handleLinkedinLogin = () => {
    if (!disabled) {
      if (onClick) {
        onClick();
      }
      window.location.href = linkedinOAuthURL;
    }
  };
  useEffect(() => {
    const windowUrl = window.location.href;
    const codeMatch = windowUrl.match(/code=([a-zA-Z0-9_\-]+)/);

    if (codeMatch) {
      const processLinkedInLogin = async () => {
        try {
          const ipData = JSON.parse(localStorage.getItem("ip_details"));
          const loginData = {
            provider: "linkedin",
            data: { code: codeMatch[1] },
            ip_data: ipData,
          };
          await dispatch(socialLogin(loginData))
          notification.success({ message: "Login successful" });
        } catch (error) {
          console.error("Error during login process:", error);
          notification.error({ message: "Error during login" });
        }
      };
      processLinkedInLogin();
    }
  }, [dispatch]);

  return (
    <div>
      <button
        className="login-btn"
        disabled={disabled}
        onClick={handleLinkedinLogin}
      >
        <span>
          <img src="./images/login2.png" alt="LinkedIn" />
        </span>
        Continue with LinkedIn
      </button>
    </div>
  );
};

export default LinkedInOAuth;
