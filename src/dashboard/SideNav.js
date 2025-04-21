import { useEffect } from "react";
import { Menu } from "antd";
import {
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/slice/sidebarSlice";
import Points from "./components/Points";
function getItem(label, key, icon, children, type, onClick) {
  return {
    key,
    icon,
    children,
    label: <div onClick={onClick}>{label}</div>,
    type,
  };
}

function Sidenav() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const { personalDetail } = useSelector(({ auth }) => auth);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const items = [
    getItem(
      <NavLink to="/dashboard">
        <span className="icon">
          <AppstoreOutlined />{" "}
        </span>
        <span className="label">Dashboard</span>
      </NavLink>,
      "1",
      null,
      null,
      null,
      handleToggleSidebar
    ),

    getItem(
      <NavLink to="/personal-details">
        <span className="icon">
          <UserOutlined />
        </span>{" "}
        <span className="label">Personal Details</span>
      </NavLink>,
      "2",
      null,
      null,
      null,
      handleToggleSidebar
    ),

    getItem(
      <NavLink to="/transaction">
        <span className="icon">
          <BarsOutlined />
        </span>{" "}
        <span className="label">Passbook</span>
      </NavLink>,
      "3",
      null,
      null,
      null,
      handleToggleSidebar
    ),

    getItem(
      <NavLink to="/sign-out">
        <span className="icon">
          <LogoutOutlined color="red" />{" "}
        </span>
        <span className="label">Sign Out</span>
      </NavLink>,
      "4",
      null,
      null,
      null,
      handleToggleSidebar
    ),
  ];

  return (
    <>
      <div
        className={
          isOpen ? "dashbord-nav-wrapper " : "dashbord-nav-wrapper close-nav"
        }
      >
        <div className="sidenav-wrapper">
          <div className="close-arrow" onClick={handleToggleSidebar}>
            <MdKeyboardDoubleArrowLeft />
          </div>
          <div className="brand">
            <img src="./logo/websamp.png" alt=" websamp logo" />
          </div>
          <div className="nav-user-info text-center mb-5">
            <div className="user-img">
              <img
                src={
                  personalDetail?.img ??
                  "https://img.icons8.com/bubbles/100/000000/user.png"
                }
                referrerPolicy="no-referrer"
                alt="user profile"
              />
            </div>
            <div className="user-detail">
              <h5 className="fw-bold">
                Hi! <span>{personalDetail?.name ?? "demo"}</span>{" "}
              </h5>
              <h6 className="fw-bold">
                WSP - <Points />
              </h6>
            </div>
          </div>
          <div className="sidebar">
            <Menu
              mode="inline"
              theme="light"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              items={items}
            >

              
            </Menu>
          </div>
        </div>
      </div>
      <div
        className={
          isOpen ? "close-sidenav-wrapper close" : "close-sidenav-wrapper "
        }
        onClick={handleToggleSidebar}
      ></div>
    </>
  );
}

export default Sidenav;
