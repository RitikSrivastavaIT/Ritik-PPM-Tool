import axios from "axios";
import { GET_ERRORS, GET_PROJECTS } from "./types";
import { type } from "@testing-library/user-event/dist/type";

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
        payload: {
          message: "An unexpected error occurred. Check if backend is up.",
        },
      });
    }
    return false;
  }
};

export const getProjects = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8080/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};
