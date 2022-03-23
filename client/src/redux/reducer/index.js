import {
  fillGenders,
  orderAscName,
  orderDesName,
  orederMaxMinRanting,
  orederMinMaxRanting,
} from "../../controllers";
import {
  GET_ALL_VIDEOGAMER,
  GET_SEARCH_VIDEOGAMER_BD_API,
  GET_ALL_GENDERS,
  GET_FILLTER_GENDERS,
  GET_FILLTER_NAME,
  GET_FILLTER_ASC_DES,
  GET_FILLTER_MAX_MIN,
  GET_ALL_FILLTER_API_CREATE,
  ADD_VIDEOGAMER,
  GET_ALL_PLATFORMS,
  GET_VIDEOGAMER_ID,
  RESET_VIDEOGAMER_ID,
  ERROR_CONN,
  RESET_VIDEOGAMER,
} from "../actions/action-types";
const stateInicia = {
  dataAllApi: [],
  dataAllApiResp: [],
  dataAllBD: [],
  dataAll: [],
  dataAllGenders: [],
  dataAllPlatforms: [],
  dataID: null,
  errorCon: false,
};
//objeto render
const o = {};
const obj = {
  [ERROR_CONN]: (state, action) => ({
    ...state,
    errorCon: action.payload,
  }),
  [RESET_VIDEOGAMER]: (state, _action) => ({
    ...state,
    dataAll: state.dataAllApiResp,
  }),

  [GET_ALL_VIDEOGAMER]: (state, action) => {
    const all = action.payload[0].length
      ? [...action.payload[0], ...action.payload[1]]
      : [...action.payload[1]];
    const asc = all.sort(orderAscName);
    return {
      ...state,
      dataAllBD: [...action.payload[0]],
      dataAllApi: [...action.payload[1]],
      dataAll: [...asc],
      dataAllApiResp: [...asc],
    };
  },

  [GET_ALL_PLATFORMS]: (state, _action) => {
    const all = state.dataAllApiResp;
    const AllPlatforms = all.map(({ platforms }) => platforms);

    const allNameFilter = AllPlatforms.reduce((acc, elm) => {
      acc.push(...elm);
      const fill = new Set(acc);
      acc = [...fill];
      return acc;
    });

    return {
      ...state,
      dataAllPlatforms: [...allNameFilter],
    };
  },

  [GET_SEARCH_VIDEOGAMER_BD_API]: (state, action) => {
    const all = action.payload[0].length
      ? [...action.payload[0], ...action.payload[1]]
      : [...action.payload[1]];
    return {
      ...state,
      dataAll: [...all],
    };
  },

  [GET_ALL_GENDERS]: (state, action) => ({
    ...state,
    dataAllGenders: action.payload,
  }),

  [GET_FILLTER_GENDERS]: (state, action) => {
    //state.dataAll = state.dataAllApiResp;
    let fill = state.dataAll.filter(({ genres }) =>
      fillGenders(genres, action.payload)
    );

    if (!fill.length) fill = [1];

    return action.payload === "All"
      ? { ...state }
      : {
          ...state,
          dataAll: fill,
        };
  },

  [GET_FILLTER_NAME]: (state, { payload }) => {
    state.dataAll = state.dataAllApiResp;

    return payload === "All"
      ? { ...state }
      : {
          ...state,
          dataAll: state.dataAll.filter(({ name }) => name === payload),
        };
  },

  [GET_FILLTER_ASC_DES]: (state, action) => {
    const filt =
      action.payload === "des"
        ? state.dataAll.sort(orderDesName)
        : state.dataAll.sort(orderAscName);

    return { ...state, dataAll: filt };
  },

  [GET_FILLTER_MAX_MIN]: (state, action) => {
    const filt =
      action.payload === "min-max"
        ? state.dataAll.sort(orederMinMaxRanting)
        : state.dataAll.sort(orederMaxMinRanting);

    return { ...state, dataAll: filt };
  },

  [ADD_VIDEOGAMER]: (state, _action) => ({ ...state }),

  [GET_ALL_FILLTER_API_CREATE]: (state, action) => {
    if (action.payload === "All") {
      state.dataAll = state.dataAllApiResp;
    }
    if (action.payload === "creados") {
      state.dataAll = state.dataAllBD;
    }
    if (action.payload === "api") {
      state.dataAll = state.dataAllApi;
    }
    return { ...state };
  },
  [GET_VIDEOGAMER_ID]: (state, action) => ({
    ...state,
    dataID: action.payload,
  }),

  [RESET_VIDEOGAMER_ID]: (state, _action) => ({ ...state, dataID: null }),
};

const rootReducer = (state = stateInicia, action) => {
  return !obj.hasOwnProperty(action.type)
    ? state
    : obj[action.type](state, action);
};

export default rootReducer;
