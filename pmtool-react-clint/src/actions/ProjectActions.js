import axios from "axios";
import { GET_ERRORS } from "./types";

export const createProject = (project) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/api/project", project);
    return true;
  } catch (err) {
    if (err.response) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    } else {
      console.error("Error:", err.message);
      dispatch({
        type: GET_ERRORS,
        payload: { message: "An unexpected error occurred" },
      });
    }
    return false;
  }
};
