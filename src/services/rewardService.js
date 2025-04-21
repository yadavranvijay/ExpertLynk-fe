import axios from "axios";
import { canonicalizeResponse, authHeader } from "./common";

const getAllRewardData = (body) => {
  return axios
    .post(process.env.REACT_APP_BASE_API_URL + "/v1/api/reward/transactions", body, { headers: authHeader() })
    .then((response) => {
      return canonicalizeResponse(response);
    });
};

const getMyRefferals = () => {
  return axios
    .get(process.env.REACT_APP_BASE_API_URL + "/v1/api/reward/my-referrals", {
      headers: authHeader(),
    })
    .then((response) => {
      return canonicalizeResponse(response);
    });
};

const listRefferals = (body) => {
  return axios
    .post(process.env.REACT_APP_BASE_API_URL + "/v1/api/reward/referrals", body, { headers: authHeader() })
    .then((response) => {
      return canonicalizeResponse(response);
    });
};

const listRefferalTransaction = (body) => {
  return axios
    .post(process.env.REACT_APP_BASE_API_URL + "/v1/api/reward/referral/transactions", body, { headers: authHeader() })
    .then((response) => {
      return canonicalizeResponse(response);
    });
};

const saveRefferalCode = (referCode) => {
  return axios
    .post(process.env.REACT_APP_BASE_API_URL + "/v1/api/reward/apply-referral", referCode, { headers: authHeader() })
    .then((response) => {
      return canonicalizeResponse(response);
    });
};

const inviteFriends = (emails) => {
  return axios
    .post(process.env.REACT_APP_BASE_API_URL + "/v1/api/reward/invite", emails, { headers: authHeader() })
    .then((response) => {
      return canonicalizeResponse(response);
    });
};

const withdrawRequest = (withdrawDetails) => {
  return axios
    .post(process.env.REACT_APP_BASE_API_URL + "/v1/api/reward/withdraw-request", withdrawDetails, { headers: authHeader() })
    .then((response) => {
      return canonicalizeResponse(response);
    });
};

export default {
  getAllRewardData,
  saveRefferalCode,
  getMyRefferals,
  listRefferals,
  listRefferalTransaction,
  inviteFriends,
  withdrawRequest
};
