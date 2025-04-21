import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import referReducer from './slice/referSlice';
import profileReducer from "./slice/profileSlice"
import rewardReducer from "./slice/rewardSlice"
import surveyReducer from "./slice/surveySlice"
import homesurveysReducer from "./slice/homeSurveySlice"
import sidebarReducer from './slice/sidebarSlice';
export const store = configureStore({
  reducer: {
    homesurveys: homesurveysReducer,
    auth :authReducer,
    profile: profileReducer,
    refer: referReducer,
    reward: rewardReducer,
    assignedSurveys: surveyReducer,
    sidebar: sidebarReducer
  },
});