import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = () => {
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(logout());
      navigate("/");
    };

    signOut();
  }, [dispatch, navigate]);

  return (
    <>
      <h1>Signing Out ... </h1>
    </>
  );
};

export default SignOut;
