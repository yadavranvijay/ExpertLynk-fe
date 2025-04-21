import React, { useEffect } from "react";
import { notification } from "antd";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socialLogin } from "../../redux/slice/authSlice";
import { saveRefferalCode } from "../../redux/slice/rewardSlice";
import axios from "axios";

const fetchIpData = async () => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    localStorage.setItem("ip_details", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch IP data:", error);
    return null;
  }
};

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const refcode = new URLSearchParams(location.search).get("refcode");
  const authStatus = useSelector((state) => state.auth);

  useEffect(() => {
    fetchIpData();
  }, []);

  useEffect(() => {
    if (authStatus.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [authStatus.isLoggedIn, navigate]);

  const onLoginSuccess = (res) => {
    try {
      const ipData = JSON.parse(localStorage.getItem("ip_details"));
      const loginData = {
        provider: "google",
        data: res,
        ip_data: ipData,
      };
      dispatch(socialLogin(loginData));
      if (refcode) {
        dispatch(saveRefferalCode({ code: refcode.toUpperCase() }));
      }
    } catch (error) {
      notification.error({ message: "Error during login" });
      console.error("Error during login:", error);
    }
  };

  const onLoginFailure = (res) => {
    notification.error({ message: "Google Login Failed" });
    console.log("Login Failed:", res);
  };

  return (
    <>
      <GoogleLogin
        onSuccess={onLoginSuccess}
        onError={onLoginFailure}
        uxMode="popup"
        theme="outline"
        text="signin_with"
        shape="rectangular"
        size="large"
        logoAlignment="left"
        style={{ display: "none !impotent" }}
      >
        <button
          className="your-custom-button-class"
          onClick={(e) => {
            // Prevent the default button click behavior
            e.preventDefault();
          }}
        >
          Login with Google
        </button>
      </GoogleLogin>
    </>
  );
};

export default GoogleLoginButton;



