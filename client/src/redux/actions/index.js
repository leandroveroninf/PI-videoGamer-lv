import axios from "axios";
import {
  GET_ALL_VIDEOGAMER,
  GET_SEARCH_VIDEOGAMER_BD_API,
  GET_ALL_GENDERS,
  GET_ALL_FILLTER_API_CREATE,
  GET_ALL_PLATFORMS,
  GET_FILLTER_GENDERS,
  GET_FILLTER_NAME,
  GET_FILLTER_ASC_DES,
  GET_FILLTER_MAX_MIN,
  GET_VIDEOGAMER_ID,
  RESET_VIDEOGAMER_ID,
  ERROR_CONN,
  RESET_VIDEOGAMER,
} from "./action-types";

const fn = (type, payload) => ({ type, payload });

export const setErrorCon = (payload) => fn(ERROR_CONN, payload);

export const getResetVideogamer = (payload) => ({ type: RESET_VIDEOGAMER });

export const getFilterGenders = (payload) => fn(GET_FILLTER_GENDERS, payload);

export const getFilterName = (payload) => fn(GET_FILLTER_NAME, payload);

export const getFilterASC_DES = (payload) => fn(GET_FILLTER_ASC_DES, payload);

export const getAllFilterAPI_CREATE = (payload) =>
  fn(GET_ALL_FILLTER_API_CREATE, payload);

export const getFilterMAX_MIN = (payload) => fn(GET_FILLTER_MAX_MIN, payload);

export const getAllFilterPlatforms = () => ({ type: GET_ALL_PLATFORMS });

export const resetId = () => ({ type: RESET_VIDEOGAMER_ID });

export const getAllVideoGamer = () => async (dispatch) => {
  try {
    const dataBD = await axios.get("http://localhost:3001/videogames/");
    return dispatch(fn(GET_ALL_VIDEOGAMER, dataBD.data));
  } catch (e) {
    return dispatch(fn(ERROR_CONN, true));
  }
};

export const getVideoGamerID = (idGamer) => async (dispatch) => {
  try {
    const dataBD = await axios.get(
      `http://localhost:3001/videogames/${idGamer}`
    );
    return dispatch(fn(GET_VIDEOGAMER_ID, dataBD.data));
  } catch (e) {
    return dispatch(fn(ERROR_CONN, true));
  }
};

export const getSearchName = (name) => async (dispatch) => {
  try {
    const dataBD = await axios.get(
      `http://localhost:3001/videogames/?name=${name}`
    );

    return dispatch(fn(GET_SEARCH_VIDEOGAMER_BD_API, dataBD.data));
  } catch (e) {
    return dispatch(fn(ERROR_CONN, true));
  }
};

export const getAllGenders = () => async (dispatch) => {
  try {
    const dataBD = await axios.get(`http://localhost:3001/genres`);
    return dispatch(fn(GET_ALL_GENDERS, dataBD.data));
  } catch (e) {
    return dispatch(fn(ERROR_CONN, true));
  }
};

export const postCreateVideoGamer = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/videogame",
      payload
    );
    return response;
  } catch (e) {
    return dispatch(fn(ERROR_CONN, true));
  }
};
