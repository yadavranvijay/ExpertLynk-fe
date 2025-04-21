import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import { fetchMe} from "../../redux/slice/authSlice";
const Points = () => {
    const dispatch = useDispatch();
    const { personalDetail } = useSelector(({ auth }) => auth);
    useEffect(() => {
      dispatch(fetchMe({}));
       updateLocalStorage()
    }, [dispatch]);
  
    const updateLocalStorage = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = {
        ...storedUser,  
        data: {
          ...storedUser?.data,   
          user: {
            ...storedUser?.data?.user,   
            ...personalDetail,  
          },
        },
      };
    
      localStorage.setItem("user", JSON.stringify(updatedUser));
      //setUser(JSON.parse(userData));
    };
  return (
    <span>{personalDetail?.balance?.WSP ?? 0}</span>
  )
}

export default Points
