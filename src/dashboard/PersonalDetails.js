import React, { useEffect } from "react";
 
import DetailTab from "./detailsTab/details";
import DashboardHeader from "./components/DashboardHeader1";
import DashboardTabbar from "./components/DashboardTabbar";
const PersonalDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  return (
    <div>
     <DashboardHeader />
      <div className="container mt-4 min-h">
        <DashboardTabbar />
              <DetailTab />
            </div>
    </div>
  );
};

export default PersonalDetails;
