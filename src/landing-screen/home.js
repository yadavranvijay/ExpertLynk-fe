import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FlippingBanner from "./components/Flip";
import LoginForm from "./components/LoginForm";
import { toggleLoginCard } from "../redux/slice/sidebarSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showForm, setshowForm] = useState(false);
  const [showForm1, setshowForm1] = useState(false);
  const authStatus = useSelector((state) => state.auth);
  const isLoggedIn = authStatus.isLoggedIn;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLoggedIn) {
      navigate("/dashboard");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const authData = urlParams.get("authData");
    if (authData) {
      const decodedAuthData = decodeURIComponent(authData);
      const authDataObject = JSON.parse(decodedAuthData);
      localStorage.setItem("user", JSON.stringify(authDataObject));
      console.log("url authData",authDataObject)
      const token = authDataObject?.data?.token;
       localStorage.setItem("token", JSON.stringify(token));
      navigate("/dashboard");
    }

    const referrerCode = urlParams.get('referrer');
    if (referrerCode) {
      sessionStorage.setItem('referrerCode', referrerCode);
    }
  }, [isLoggedIn, navigate]);

  const handleToggleSidebar = () => {
    dispatch(toggleLoginCard());
  };

  return (
    <>
      <div className="home-banner position-relative">
        <div className="banner-content ">
          <div className="container h-100">
            <div className="row d-flex align-items-center h-100 py-50">
              <div className="col-md-5">
                <div className="wrapper banner-form text-white  text-md-start ">
                  <h2 className="h5 sub-title mb-3">Welcome To Websamp</h2>
                  <h1>
                    {" "}
                    Share Your Thoughts, <br /> Earn Rewards
                  </h1>
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-6">
                <div className="wrapper  ">
                  <div className="form-card">
                    <h2 className="h4 text-dark-50 mb-4"> Join For Free! </h2>
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="steps-wrapper step2 position-relative py-5">
        <div className="image-background">
          <img src="./images/background1.jpg" alt="" />
        </div>
        <div className="container">
          <div className="heading-section text-center pb-md-5 mt-4">
            <h2> How it works?</h2>
          </div>
          <div className="row">
            <div className="col-md-3 col-6 mt-4" onClick={() => setshowForm(!showForm)} >
              {showForm ? (
                <div className="wrapper">
                  <LoginForm />
                </div>
              ) : (
                <div className="wrapper">
                  <div className="iwrapper">
                    <div className="img">
                      <img src="./images/login.png" alt="" />
                    </div>
                  </div>

                  <div className="text">
                    <h3 className="h3">Sign up </h3>
                    <p>
                      Want to make a difference? Sign up for WebSamp and share
                      your insights.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-3 col-6 mt-4">
              <div className="wrapper">
                <div className="iwrapper">
                  <div className="img">
                    <img src="./logo/Websamp-fav.png" alt="" />
                  </div>
                </div>
                <div className="text">
                  <h3 className="h3">Participate </h3>
                  <p>
                    Your opinion matters! Take our quick survey and help shape
                    the future.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 mt-4">
              <div className="wrapper">
                <div className="iwrapper">
                  <div className="img">
                    <img src="./images/reward.png" alt="" />
                  </div>
                </div>
                <div className="text">
                  <h3 className="h3">Earn money</h3>
                  <p>
                    Your time is valuable. Earn rewards for sharing your
                    opinion.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6 mt-4"
             
              onClick={() => setshowForm1(!showForm1)}
            >
              {showForm1 ? (
                <div className="wrapper ">
                  <LoginForm />
                </div>
              ) : (
                <div className="wrapper gr">
                  <FlippingBanner />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className=" position-relative py-5">
        <div className="image-background">
          <img src="./images/background1.jpg" alt="" />
        </div>
        <div className="container">
          <div className="row extra-info">
            <div className="col-md-6   mt-4">
              <div className="card p-4">
                <div className="wrapper d-flex align-items-center mt-sm-0 mt-3">
                  <div className="img-part">
                    <img src="./images/work/09.png" alt="" />
                  </div>
                  <div className="text-part text-sm-start ms-sm-4 mt-sm-0 mt-3">
                    <h3 className="h2 fw-bold">Data is secure </h3>
                    <p>Your data is completely secure and protected with us.</p>
                    <button onClick={handleToggleSidebar} className="btn">
                      {" "}
                      Take Survey
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6   mt-4">
              <div className="card p-4">
                <div className="wrapper d-flex align-items-center ">
                  <div className="img-part">
                    <img src="./images/work/10.png" alt="" />
                  </div>
                  <div className="text-part text-sm-start ms-sm-4 mt-sm-0 mt-3">
                    <h3 className="h2 fw-bold">Share opinion </h3>
                    <p>
                      Diversity of opinions is a cornerstone of our operations.
                    </p>
                    <button onClick={handleToggleSidebar} className="btn">
                      {" "}
                      Take Survey
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="steps-wrapper position-relative bg-2 pt-5">
        <div className="container">
          <div className="heading-section-left  pb-2 mt-0">
            <h2> Download Our App</h2>
            <p>
              Enhance your survey experience by downloading our app today! With
              our app, you can easily participate in surveys. Stay informed
              about new survey opportunities and contribute your insights on the
              go. Download our app now and start sharing your opinions
              effortlessly!
            </p>
          </div>
          <div className="app-links d-flex gap-3  pb-5">
            <div className="ios">
              <img src="./images/app/01.jpg" alt="" />
            </div>

            <div className="android">
              <NavLink
                className=" d-inline-block"
                to="https://play.google.com/store/apps/datasafety?id=com.websamp.app"
              >
                <img src="./images/app/02.jpg" alt="" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
