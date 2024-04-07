import {
  DELETE_PHOTO_ERROR,
  DELETE_PHOTO_PROGRESS,
  DELETE_PHOTO_SUCCESS,
  GET_PHOTO_ERROR,
  GET_PHOTO_PROGRESS,
  GET_PHOTO_SUCCESS,
  POST_PHOTO_ERROR,
  POST_PHOTO_PROGRESS,
  POST_PHOTO_SUCCESS,
  UPDATE_PHOTO_ERROR,
  UPDATE_PHOTO_PROGRESS,
  UPDATE_PHOTO_SUCCESS,
} from "./photoAction";

const initialState = {
  photo: [],
  isLoding: false,
  isError: null,
};

const photoReducer = (state = initialState, action) => {
  // console.log("hello my name is  -", action);
  switch (action.type) {
    case GET_PHOTO_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case GET_PHOTO_SUCCESS:
      return {
        ...state,
        isLoding: false,
        photo: action.data.data,
        isError: null,
      };
    case GET_PHOTO_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case POST_PHOTO_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case POST_PHOTO_SUCCESS:
      return {
        ...state,
        isLoding: false,
        photo: state.photo.concat(action.data),
        isError: null,
      };
    case POST_PHOTO_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case DELETE_PHOTO_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case DELETE_PHOTO_SUCCESS:
      const filterPHOTO = state.photo.filter((val) => val._id !== action.data);
      return {
        ...state,
        isLoding: false,
        photo: filterPHOTO,
        isError: null,
      };
    case DELETE_PHOTO_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case UPDATE_PHOTO_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case UPDATE_PHOTO_SUCCESS:
      const updatedphoto = state.photo.map((item) =>
        item._id === action.data._id ? action.data : item
      );

      console.log("action", action.data);
      console.log("updatedphoto", updatedphoto);

      return {
        ...state,
        isLoading: false,
        photo: updatedphoto,
        isError: null,
      };

    case UPDATE_PHOTO_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    default:
      return { ...state };
  }
};

export default photoReducer;
