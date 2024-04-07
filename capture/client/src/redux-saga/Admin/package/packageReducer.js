import {
  DELETE_PACKAGE_ERROR,
  DELETE_PACKAGE_PROGRESS,
  DELETE_PACKAGE_SUCCESS,
  GET_PACKAGE_ERROR,
  GET_PACKAGE_PROGRESS,
  GET_PACKAGE_SUCCESS,
  POST_PACKAGE_ERROR,
  POST_PACKAGE_PROGRESS,
  POST_PACKAGE_SUCCESS,
  UPDATE_PACKAGE_ERROR,
  UPDATE_PACKAGE_PROGRESS,
  UPDATE_PACKAGE_SUCCESS,
} from "./packageAction";

const initialState = {
  package: [],
  isLoding: false,
  isError: null,
};

const packageReducer = (state = initialState, action) => {
  // console.log("hello my name is  -", action);
  switch (action.type) {
    case GET_PACKAGE_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case GET_PACKAGE_SUCCESS:
      return {
        ...state,
        isLoding: false,
        package: action.data.data,
        isError: null,
      };
    case GET_PACKAGE_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case POST_PACKAGE_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case POST_PACKAGE_SUCCESS:
      return {
        ...state,
        isLoding: false,
        package: state.package.concat(action.data),
        isError: null,
      };
    case POST_PACKAGE_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case DELETE_PACKAGE_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case DELETE_PACKAGE_SUCCESS:
      const filterPACKAGE = state.package.filter(
        (val) => val._id !== action.data
      );
      return {
        ...state,
        isLoding: false,
        package: filterPACKAGE,
        isError: null,
      };
    case DELETE_PACKAGE_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case UPDATE_PACKAGE_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case UPDATE_PACKAGE_SUCCESS:
      console.log("action", action.data._id);
      console.log("action", action.data);
      const updatedPACKAGE = state.package.map((item) =>
        item._id === action.data._id ? action.data : item
      );
      console.log("updatedPACKAGE", updatedPACKAGE);

      return {
        ...state,
        isLoading: false,
        package: updatedPACKAGE,
        isError: null,
      };

    case UPDATE_PACKAGE_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    default:
      return { ...state };
  }
};

export default packageReducer;
