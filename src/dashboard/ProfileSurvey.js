import React, { useEffect } from "react";
import ProfileSurvey from "./profilesurveycomponent";
import DashboardHeader from "./components/DashboardHeader1";
import DashboardTabbar from "./components/DashboardTabbar";
const ProfileSurveyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
       <DashboardHeader />
      <div className="container mt-4 min-h">
        <DashboardTabbar />
        <ProfileSurvey />
      </div>
    </div>
  );
};

export default ProfileSurveyPage;
