import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { socialLogin } from "../../redux/slice/authSlice";
import { saveRefferalCode } from "../../redux/slice/rewardSlice";
import { notification } from "antd";
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

const TwitterOauthButton = ({ disabled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth);
  const refcode = new URLSearchParams(location.search).get("refcode");

  useEffect(() => {
    fetchIpData();
  }, []);

  useEffect(() => {
    if (authStatus.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [authStatus.isLoggedIn, navigate]);

  const TWITTER_CLIENT_ID = "NjRJaktVcTdtaER6LURJZldqZU86MTpjaQ";
  const REDIRECT_URL = "http://localhost:3000/";

  function getTwitterOauthUrl() {
    const rootUrl = "https://twitter.com/i/oauth2/authorize";
    const options = {
      redirect_uri: REDIRECT_URL,
      client_id: TWITTER_CLIENT_ID,
      state: "state",
      response_type: "code",
      code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8",
      code_challenge_method: "S256",
      scope: ["users.read"].join(" "),
    };
    const qs = new URLSearchParams(options).toString();
    return `${rootUrl}?${qs}`;
  }

  useEffect(() => {
    const windowUrl = window.location.href;
    const codeMatch = windowUrl.match(/code=([a-zA-Z0-9_\-]+)/);

    if (codeMatch) {
      const processTwitterLogin = async () => {
        try {
          const ipData = JSON.parse(localStorage.getItem("ip_details"));
          const loginData = {
            provider: "TWITTER",
            data: { code: codeMatch[1] },
            ip_data: ipData,
          };
          await dispatch(socialLogin(loginData));
          if (refcode) {
            await dispatch(saveRefferalCode({ code: refcode.toUpperCase() }));
          }
          notification.success({ message: "Login successful" });
        } catch (error) {
          console.error("Error during login process:", error);
          notification.error({ message: "Error during login" });
        }
      };
      processTwitterLogin();
    }
  }, [dispatch, refcode]);

  const handleTwitterLogin = () => {
    window.location.href = getTwitterOauthUrl();
  };

  return (
    <button
      className="login-btn"
      type="button"
      disabled={disabled}
      onClick={handleTwitterLogin}
    >
      <span>
        <img src="./images/twitter.png" alt="Twitter" />
      </span>{" "}
      Continue with Twitter
    </button>
  );
};

export default TwitterOauthButton;
