import React, { useState } from "react";
import { Progress } from 'antd';
import  ProfileSurveyCategoryDrawer  from "../ProfileSurveyCategoryDrawer"
import { MdDoubleArrow } from "react-icons/md";


const ProfileSurveyCategory = ({ categoryData }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };



  const completePercent = parseInt((categoryData.response_count / categoryData.questions_count) * 100)
  return (
    <>
    <div className="profile-wrapper h-100 " onClick={showDrawer}>
      <div className="wrapper">
        <div className="img" onClick={showDrawer}>
          <img src={categoryData.img} alt=" profile survey" />
        </div>
        <div className="text mt-4 px-2">
          <h3 onClick={showDrawer}>{categoryData.name}</h3>
        <Progress
          percent={completePercent}
          format={(percent) => `${categoryData.response_count} / ${categoryData.questions_count}`}
          style={{ width: "95%" }}
        />
        <span className="profile-btn"><MdDoubleArrow /></span>
        </div>
      </div>
    </div>
      {isDrawerOpen &&
        <ProfileSurveyCategoryDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          categoryData={categoryData}
        />}
    </>
  );
};
export default ProfileSurveyCategory;
