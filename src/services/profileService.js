import axios from "axios";
import { canonicalizeResponse, authHeader } from "./common";

const getAllCategoryData = () => {
  return axios
    .get(process.env.REACT_APP_BASE_API_URL + "/v1/api/profile/categories", {
      headers: authHeader(),
    })
    .then((response) => {
      return canonicalizeResponse(response);
    });
};

const saveCategoryData = (categoryData) => {
  return axios
    .post(
      process.env.REACT_APP_BASE_API_URL + "/v1/api/profile/category",
      categoryData,
      { headers: authHeader() }
    )
    .then((response) => {
      return canonicalizeResponse(response);
    });
};

export default {
  getAllCategoryData,
  saveCategoryData,
};
