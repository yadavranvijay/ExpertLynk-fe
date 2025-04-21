import React, { useState, useEffect } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/slice/sidebarSlice";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const DashboardHeader = () => {
  const [isSticky, setIsSticky] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`dash-content-wrapper  dashboard-header ${
        isSticky ? "sticky" : ""
      }`}
    >
      <div className="px-sm-5 px-3 py-2 n-wrapper d-flex align-items-center justify-content-between">
        <div className="back-button" onClick={handleGoBack}>
          <IoArrowBack size={24} />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="sidenav-open" onClick={handleToggleSidebar}>
            <FaBarsStaggered />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
