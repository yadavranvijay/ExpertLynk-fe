import React from "react";

import { useDispatch } from "react-redux";
import { toggleLoginCard } from "../../redux/slice/sidebarSlice";

const LoginButton = () => {
  const dispatch = useDispatch()
  const handleToggleSidebar = () => {
      dispatch(toggleLoginCard());
    };
  return (
    <div className="btn-wrapper position-relative">
      <button onClick={handleToggleSidebar}>
       Login
      </button>
    </div>
  );
};

export default LoginButton;
