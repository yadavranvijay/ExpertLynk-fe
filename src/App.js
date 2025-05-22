import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./landing-screen/home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LandingLayout from "./layouts/LandingLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./dashboard/Home";
import TermService from "./landing-screen/TermService";
import PrivacyPolicy from "./landing-screen/PrivacyPolicy";
import ProfileSurvey from "./dashboard/ProfileSurvey";
import PersonalDetails from "./dashboard/PersonalDetails";
import SignOut from "./dashboard/SignOut";
import SurveyPage from "./dashboard/Survey";
import { useSelector } from "react-redux";

//  import Transaction from "./dashboard/Transaction";
// import Referral from "./dashboard/Referral";
// import Earnings from "./dashboard/Earnings";
// import Reward from "./dashboard/Reward";
// import Prescreener from "./dashboard/Prescreener";
// import ThankYou from "./dashboard/ThankYou";
// import NotQualified from "./dashboard/NotQualified";

import CaptureResponse from "./dashboard/CaptureResponse";
import { useNavigate } from "react-router-dom";
import Login from "./landing-screen/Login";
import Register from "./landing-screen/Register";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedInres, setisLoggedInres] = useState(false);
  const authStatus = useSelector((state) => state.auth);
  const isLoggedIn = authStatus.isLoggedIn;
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authData = urlParams.get("authData");

    if (authData) {
      const parsedAuthData = JSON.parse(decodeURIComponent(authData));
      if (parsedAuthData?.is_success) {
        localStorage.setItem("user", JSON.stringify(parsedAuthData));
        const token = parsedAuthData?.data?.token;
        localStorage.setItem("token", JSON.stringify(token));
        setisLoggedInres(true);
        navigate("/dashboard");
      }
    } else {
      const storedAuthData = localStorage.getItem("user");
      const authDataObject = storedAuthData ? JSON.parse(storedAuthData) : null;

      if (authDataObject?.is_success) {
        setisLoggedInres(authDataObject?.is_success);
      } else {
        setisLoggedInres(isLoggedIn);
      }
    }

    setIsLoading(false);
  }, [isLoggedIn, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/profile-survey" element={<ProfileSurvey />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        {/* <Route path="/transaction" element={<Transaction />} />
          <Route path="/refer" element={<Referral />} /> */}
        <Route path="/survey" element={<SurveyPage />} />
        {/* <Route path="/earning" element={<Earnings />} />
          <Route path="/reward" element={<Reward />} /> */}
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
      <Route path="/" element={<Login />} />
    </Routes>
  );

  // return (

  //           <Routes>
  //             {isLoggedInres ? (
  //               <>
  //               <Route element={<DashboardLayout />}>
  //                 <Route path="/dashboard" element={<DashboardHome />} />
  //                 <Route path="/profile-survey" element={<ProfileSurvey />} />
  //                 <Route path="/personal-details" element={<PersonalDetails />} />
  //                 {/* <Route path="/transaction" element={<Transaction />} />
  //                 <Route path="/refer" element={<Referral />} /> */}
  //                 <Route path="/survey" element={<SurveyPage />} />
  //                 {/* <Route path="/earning" element={<Earnings />} />
  //                 <Route path="/reward" element={<Reward />} /> */}

  //                 <Route path="/sign-out" element={<SignOut />} />

  //                 <Route path="*" element={<Navigate to="/dashboard" />} />
  //               </Route>
  //               {/* <Route path="/pre-screener" element={<Prescreener />} />
  //               <Route path="/not-qualified" element={<NotQualified />} />
  //                <Route path="/thank-you" element={<ThankYou />} />
  //                <Route path="/post-survey" element={<CaptureResponse />} /> */}
  //                </>
  //             ) : (
  //               <>
  //               <Route element={<LandingLayout />}>
  //                 <Route path="/" element={<Login />} />

  //                 <Route path="/term-service" element={<TermService />} />
  //                 <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  //                 <Route path="*" element={<Navigate to="/" />} />
  //               </Route>
  //               <Route path="/login" element={<Login />} />
  //                 <Route path="/register" element={<Register />} />
  //                </>
  //             )}
  //           </Routes>

  //       );
}

export default App;
