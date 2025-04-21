import React from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleLoginCard } from "../../redux/slice/sidebarSlice";
import LoginForm from "./LoginForm";
const LoginCard = () => {
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleLoginCard());
    console.log("clicked");
  };
  return (
    <div>
      <div className="login-card-wrapper">
        <div className="card-shadow" onClick={handleToggleSidebar}></div>
        <div className="login-card ">
          <div className="login-card-header mb-4 d-flex align-items-center justify-content-between">
            <h2 className="h4 mb-0">Login</h2>
            <span className="close-btn" onClick={handleToggleSidebar}>
              <IoClose />
            </span>
          </div>
          <div className="form-card">
            <h2 className="h4 text-dark-50 mb-4"> Join For Free! </h2>
            <LoginForm />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
