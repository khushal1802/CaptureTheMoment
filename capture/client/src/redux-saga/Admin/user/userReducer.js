import {
  DELETE_USER_ERROR,
  DELETE_USER_PROGRESS,
  DELETE_USER_SUCCESS,
  GET_USER_ERROR,
  GET_USER_PROGRESS,
  GET_USER_SUCCESS,
  POST_USER_ERROR,
  POST_USER_PROGRESS,
  POST_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_PROGRESS,
  UPDATE_USER_SUCCESS,
} from "./userAction";

const initialState = {
  user: [],
  isLoding: false,
  isError: null,
};

const userReducer = (state = initialState, action) => {
    // console.log("hello my name is  -", action);
  switch (action.type) {
    case GET_USER_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case GET_USER_SUCCESS:
      const UserData = action.data.data.filter((val) => val.Role === "user");

      return {
        ...state,
        isLoding: false,
        user: UserData,
        isError: null,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case POST_USER_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case POST_USER_SUCCESS:
      return {
        ...state,
        isLoding: false,
        user: state.user.concat(action.data),
        isError: null,
      };
    case POST_USER_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case DELETE_USER_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case DELETE_USER_SUCCESS:
      const filterUSER = state.user.filter((val) => val._id !== action.data);
      return {
        ...state,
        isLoding: false,
        user: filterUSER,
        isError: null,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case UPDATE_USER_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case UPDATE_USER_SUCCESS:
      const updatedUSER = state.user.map((item) =>
        item._id === action.data._id ? action.data : item
      );

      console.log("action", action.data);
      console.log("updatedUSER", updatedUSER);

      return {
        ...state,
        isLoading: false,
        user: updatedUSER,
        isError: null,
      };

    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
