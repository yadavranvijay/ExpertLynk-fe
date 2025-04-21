import React from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard, LuLayoutTemplate } from "react-icons/lu";
import { TbUserSquare } from "react-icons/tb";
import { PiNotebookBold } from "react-icons/pi";
import { FaRegFolder } from "react-icons/fa6";

const DashboardTabbar = () => {
  return (
    <div className="dashboard-tabbar position-sticky fixed-top">
      <ul className="d-flex align-items-center justify-content-start">
        <li>
          <NavLink to="/profile-survey">
            <LuLayoutTemplate className="me-2"/> Secondary Research
          </NavLink>
        </li>
        <li>
          <NavLink to="/survey">
            <FaRegFolder  className="me-2"/> Survey Templates
          </NavLink>
        </li>
        <li>
          <NavLink to="/refer">
            <TbUserSquare  className="me-2"/> Sample Providers
          </NavLink>
        </li>
        <li>
          <NavLink to="/earning">
            <FaRegFolder  className="me-2"/> Live Tracking
          </NavLink>
        </li>
        <li>
          <NavLink to="/reward">
            <PiNotebookBold  className="me-2"/> Get Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default DashboardTabbar;
