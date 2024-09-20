import axios from "axios";
import { GET_ERRORS, GET_PROJECT, GET_PROJECTS } from "./types";
import { useNavigate } from "react-router-dom";

export const createProject = (project) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/api/project", project);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    return true;
  } catch (err) {
    if (err.response) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    } else {
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
export const getProject = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    navigate("/dashboard");
  }
};
