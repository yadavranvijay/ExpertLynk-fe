import axios from "axios";
import { canonicalizeResponse, authHeader } from "./common";

const saveReferData = (referData) => {
  return axios
    .post(
      process.env.REACT_APP_BASE_API_URL + "/v1/api/profile/category",
      referData,
      { headers: authHeader() }
    )
    .then((response) => {
      return canonicalizeResponse(response);
    });
};

export default {
  saveReferData,
};
