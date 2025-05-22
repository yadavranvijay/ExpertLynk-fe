import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSurveyList } from "../redux/slice/surveySlice";
import "./dashboardStyle.css";
import { saveRefferalCode } from "../redux/slice/rewardSlice";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import DashboardTabbar from "./components/DashboardTabbar";
import { NavLink } from "react-router-dom";
import {
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Progress } from "antd"; // Import Progress from Ant Design
import { MdDoubleArrow as MdDoubleArrowIcon } from "react-icons/md"; // Correct import for MdDoubleArrow

const DashbordHome = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  // Placeholder data for multiple categories
  const categories = [
    {
      name: "Automobile",
      img: "https://ik.imagekit.io/zkumsdjqx/profile-survey/Automobile.jpg?updatedAt=1724688091976",
      response_count: 5,
      questions_count: 10,
    },
    {
      name: "Technology",
      img: "https://ik.imagekit.io/zkumsdjqx/profile-survey/Automobile.jpg?updatedAt=1724688091976",
      response_count: 8,
      questions_count: 12,
    },
    {
      name: "Healthcare",
      img: "https://ik.imagekit.io/zkumsdjqx/profile-survey/Automobile.jpg?updatedAt=1724688091976",
      response_count: 3,
      questions_count: 6,
    },
    {
      name: "Education",
      img: "https://ik.imagekit.io/zkumsdjqx/profile-survey/Automobile.jpg?updatedAt=1724688091976",
      response_count: 10,
      questions_count: 15,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);  
  }, [dispatch]);  

  return (
    <div className="main-content-wrapper">
      <div className={isOpen ? "left" : "left close-left"}>
        <div
          className={
            isOpen ? "dashbord-nav-wrapper" : "dashbord-nav-wrapper close-nav"
          }
        >
          <div className="sidenav-wrapper">
            <div className="close-arrow">
              <MdKeyboardDoubleArrowLeft />
            </div>

            <div className="sidebar">
              <div className="overview">
                <h2>Overview</h2>
              </div>

              <ul className="link-wrapper">
                <p className="h6 mb-3 text-muted">Dashboard</p>
                <li>
                  <NavLink to="/dashboard">
                    <span className="icon">
                      <AppstoreOutlined />
                    </span>
                    <span className="label">Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile">
                    <span className="icon">
                      <UserOutlined />
                    </span>
                    <span className="label">Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/surveys">
                    <span className="icon">
                      <BarsOutlined />
                    </span>
                    <span className="label">Surveys</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/sign-out">
                    <span className="icon">
                      <LogoutOutlined />
                    </span>
                    <span className="label">Logout</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={isOpen ? "right" : "right max"}>
        <DashboardTabbar />
        <div className="mt-4 min-h">
          <div className="row">
            {categories.map((category, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <div className="profile-wrapper h-100">
                  <div className="wrapper">
                    <div className="img">
                      <img
                        src={category.img}
                        alt={`profile ${category.name}`}
                      />
                    </div>
                    <div className="text mt-4 px-2">
                      <h3>{category.name}</h3>
                      <span className="gredient-line"></span>
                      <span className="profile-btn">
                        <MdDoubleArrowIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbordHome;
