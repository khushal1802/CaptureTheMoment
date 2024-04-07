import {
  DELETE_TEAM_ERROR,
  DELETE_TEAM_PROGRESS,
  DELETE_TEAM_SUCCESS,
  GET_TEAM_ERROR,
  GET_TEAM_PROGRESS,
  GET_TEAM_SUCCESS,
  POST_TEAM_ERROR,
  POST_TEAM_PROGRESS,
  POST_TEAM_SUCCESS,
  UPDATE_TEAM_ERROR,
  UPDATE_TEAM_PROGRESS,
  UPDATE_TEAM_SUCCESS,
} from "./teamAction";

const initialState = {
  team: [],
  isLoding: false,
  isError: null,
};

const teamReducer = (state = initialState, action) => {
  // console.log("hello my name is  -", action);
  switch (action.type) {
    case GET_TEAM_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        isLoding: false,
        team: action.data.data,
        isError: null,
      };
    case GET_TEAM_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case POST_TEAM_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case POST_TEAM_SUCCESS:
      return {
        ...state,
        isLoding: false,
        team: state.team.concat(action.data),
        isError: null,
      };
    case POST_TEAM_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case DELETE_TEAM_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case DELETE_TEAM_SUCCESS:
      const filterTEAM = state.team.filter((val) => val._id !== action.data);
      return {
        ...state,
        isLoding: false,
        team: filterTEAM,
        isError: null,
      };
    case DELETE_TEAM_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case UPDATE_TEAM_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case UPDATE_TEAM_SUCCESS:
      const updatedTEAM = state.team.map((item) =>
        item._id === action.data._id ? action.data : item
      );

      console.log("action", action.data);
      console.log("updatedTEAM", updatedTEAM);

      return {
        ...state,
        isLoading: false,
        team: updatedTEAM,
        isError: null,
      };

    case UPDATE_TEAM_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    default:
      return { ...state };
  }
};

export default teamReducer;
