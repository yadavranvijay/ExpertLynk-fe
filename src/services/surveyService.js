import axios from "axios";
import { canonicalizeResponse, authHeader } from "./common";

// This method posts user-assigned survey data
const userAssignedSurvey = (body) => {
  return axios
    .post(
      process.env.REACT_APP_BASE_API_URL + "/v1/api/campaign/user/surveys",
      body,
      { headers: authHeader() }
    )
    .then((response) => canonicalizeResponse(response));
};

const preScreenerQuestions = (quotaId) => {
  return axios
    .get(
     
      `${process.env.REACT_APP_BASE_API_URL}/v1/api/profile/toluna/questions?quota_id=${quotaId}`,
      { headers: authHeader() }
    )
    .then((response) => canonicalizeResponse(response));
};

const submitPreScreenerAnswers = (answers) => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_API_URL}/v1/api/identity/update-pre-screener`,
      { answers },
        { headers: authHeader() } 
   
    )
    .then((response) => canonicalizeResponse(response));
};

export default {
  userAssignedSurvey,
  preScreenerQuestions,
  submitPreScreenerAnswers
};
