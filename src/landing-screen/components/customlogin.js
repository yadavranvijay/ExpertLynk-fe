import React, { useEffect } from "react";
import { notification } from "antd";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socialLogin } from "../../redux/slice/authSlice";
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

const CustomButton = ({ disabled }) => {
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

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const ipData = JSON.parse(localStorage.getItem("ip_details"));


        const loginData = {
          provider: "google",
          data: {
            code: tokenResponse.access_token,
          },
          ip_data: ipData,
        };

        dispatch(socialLogin(loginData));

      } catch (error) {
        notification.error({ message: "Error during login" });
        console.error("Error during login:", error);
      }
    },
    onError: (error) => {
      notification.error({ message: "Login failed" });
      console.error("Error during login:", error);
    },
    uxMode: "popup",
    theme:"outline",
  });

  return (
    <button
      className="login-btn"
      disabled={disabled}
      onClick={() => {
        login();
      }}
    >
      <span>
        <img src="./images/login1.png" alt="Google" />
      </span>{" "}
      Continue with Google
    </button>
  );
};

export default CustomButton;
