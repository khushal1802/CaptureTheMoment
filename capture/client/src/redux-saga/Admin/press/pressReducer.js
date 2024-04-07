import {
  DELETE_PRESS_ERROR,
  DELETE_PRESS_PROGRESS,
  DELETE_PRESS_SUCCESS,
  GET_PRESS_ERROR,
  GET_PRESS_PROGRESS,
  GET_PRESS_SUCCESS,
  POST_PRESS_ERROR,
  POST_PRESS_PROGRESS,
  POST_PRESS_SUCCESS,
  UPDATE_PRESS_ERROR,
  UPDATE_PRESS_PROGRESS,
  UPDATE_PRESS_SUCCESS,
} from "./pressAction";

const initialState = {
  press: [],
  isLoding: false,
  isError: null,
};

const pressReducer = (state = initialState, action) => {
  // console.log("hello my name is  -", action);
  switch (action.type) {
    case GET_PRESS_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case GET_PRESS_SUCCESS:
      return {
        ...state,
        isLoding: false,
        press: action.data.data,
        isError: null,
      };
    case GET_PRESS_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case POST_PRESS_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case POST_PRESS_SUCCESS:
      return {
        ...state,
        isLoding: false,
        press: state.press.concat(action.data),
        isError: null,
      };
    case POST_PRESS_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case DELETE_PRESS_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case DELETE_PRESS_SUCCESS:
      const filterPRESS = state.press.filter((val) => val._id !== action.data);
      return {
        ...state,
        isLoding: false,
        press: filterPRESS,
        isError: null,
      };
    case DELETE_PRESS_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case UPDATE_PRESS_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case UPDATE_PRESS_SUCCESS:
      const updatedPRESS = state.press.map((item) =>
        item._id === action.data._id ? action.data : item
      );

      console.log("action", action.data);
      console.log("updatedPRESS", updatedPRESS);

      return {
        ...state,
        isLoading: false,
        press: updatedPRESS,
        isError: null,
      };

    case UPDATE_PRESS_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    default:
      return { ...state };
  }
};

export default pressReducer;
