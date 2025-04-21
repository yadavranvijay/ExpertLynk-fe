import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSurveyList } from "../redux/slice/surveySlice";
import DashboardHeader from "./components/DashboardHeader1";
import DashboardTabbar from "./components/DashboardTabbar";
import AllSurveysList from "./components/AllSurveysList";

const SurveyPage = () => {
   const dispatch = useDispatch();
  const [surveys, setSurveys] = useState({ items: [] });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 

  useEffect(() => {
    dispatch(getUserSurveyList({ order_by: ["-created_at"] }));
  }, [dispatch]);

  const assignedSurveys = useSelector(({ assignedSurveys }) => assignedSurveys);

  useEffect(() => {
    if (assignedSurveys.surveys) {
      setSurveys(assignedSurveys.surveys);
    }
  }, [assignedSurveys]);

  return (
    <div>
     <DashboardHeader />
      
      <div className="container mt-4 min-h">
        <DashboardTabbar />
        <AllSurveysList  surveys={surveys} fetching={assignedSurveys?.fetching} />
      </div>
    </div>
  );
};

export default SurveyPage;
