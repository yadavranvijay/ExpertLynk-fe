import axios from "axios";
import { canonicalizeResponse, authHeader } from "./common";

 
export const getIpDetails = async () => {
  let ipDetail = localStorage.getItem("ip_details");
  if (ipDetail !== undefined && ipDetail !== null) {
    return JSON.parse(ipDetail);
  }
  const ipdetails = await axios.get("https://ipapi.co/json/");
  localStorage.setItem("ip_details", JSON.stringify(ipdetails.data));
  return ipdetails.data;
}

 
const _LoginRegister = async (endpoint, payload) => {
  const ipDetail = await getIpDetails();
  payload["ip_data"] = ipDetail;

  const response = await axios.post(process.env.REACT_APP_BASE_API_URL + endpoint, payload);
  if (response.data.data.token) {
    localStorage.setItem("token", JSON.stringify(response.data.data.token));
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data.data.user;
  }
  return response.data;
};

 
export const continuumEmailRegister = async (username, email, password) => {
  const payload = {
    "username": username,
    "email": email,
    "password": password
  };
  return await _LoginRegister("/v1/api/identity/register", payload);
};

 
export const continuumEmailLogin = async (username, password) => {
  const payload = {
    "username": username,
    "password": password,
  };
  return await _LoginRegister("/signin", payload);
};

 
export const continuumLogin = async (provider, data) => {
  const payload = { "provider": provider, "data": data };
  return await _LoginRegister("/v1/api/identity/login", payload);
};

 
export const continuumLogout = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

 
export const continuumMe = async () => {
  const response = await axios.get(process.env.REACT_APP_BASE_API_URL + "/v1/api/identity/me", { headers: authHeader() });
   
  return canonicalizeResponse(response);
};

 
export const continuumMeUpdate = async (updatedMe) => {
  const response = await axios.post(process.env.REACT_APP_BASE_API_URL + "/v1/api/identity/update-me", updatedMe, { headers: authHeader() });
  return canonicalizeResponse(response);
};

 
export const continuumMeDelete = async (DeletedMe) => {
  const response = await axios.post(process.env.REACT_APP_BASE_API_URL + "/v1/api/identity/delete-me", DeletedMe, { headers: authHeader() });
  return canonicalizeResponse(response);
};
