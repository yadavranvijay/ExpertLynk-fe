import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Sidenav from "../dashboard/SideNav";
import ExtraInfo from "../dashboard/components/ExtraInfo";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { MdRedeem } from "react-icons/md";
import {
  RiMoneyDollarCircleLine,
  RiUserSharedLine,
  RiSurveyLine,
} from "react-icons/ri";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import DashboardTabbar from "../dashboard/components/DashboardTabbar";

const DashboardLayout = () => {
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  return (
    <div>
      <DashboardHeader />
      {/* <Sidenav /> */}
      {/* <div className="main-content-wrapper">
        <div className={isOpen ? "left" : "left close-left"}></div>
        <div className={isOpen ? "right" : "right max"}></div>
      </div> */}
      <div className="page-content">
       
        <Outlet />
      </div>

      {/* <div className="bottom-nav">
            <NavLink
              to="/profile-survey"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon">
                <CgProfile size={24} />
              </div>
              <span>Profile</span>
            </NavLink>

            <NavLink
              to="/survey"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon">
                <RiSurveyLine size={24} />
              </div>
              <span>Survey</span>
            </NavLink>

            <NavLink
              to="/refer"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon">
                <RiUserSharedLine size={24} />
              </div>
              <span>Refer</span>
            </NavLink>

            <NavLink
              to="/earning"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon">
                <RiMoneyDollarCircleLine size={24} />
              </div>
              <span>Earning</span>
            </NavLink>

            <NavLink
              to="/reward"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <div className="icon">
                <MdRedeem size={24} />
              </div>
              <span>Redeem</span>
            </NavLink>
          </div> */}

      <div className="dashboard-footer py-3 mt-4">
        <p className="text-center mb-0">Websamp Tool © Continuum Insight</p>
      </div>

      {/* Conditionally render ExtraInfo only if it's not an iPhone */}
      {/* <ExtraInfo /> */}
    </div>
  );
};

export default DashboardLayout;
