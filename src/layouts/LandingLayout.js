

import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import  Header  from "../landing-screen/header"
import  Footer  from "../landing-screen/footer"
import { useSelector } from "react-redux";
import LoginCard from "../landing-screen/components/LoginCard";
const LandingLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const isLoginCardOpen = useSelector((state) => state.sidebar.isLoginCardOpen);
  return (
    <div>
      <Header />
      <main><Outlet /></main>
      {isLoginCardOpen && (
        <LoginCard />
      )}
      <Footer />
    </div>
  );
};

export default LandingLayout;
