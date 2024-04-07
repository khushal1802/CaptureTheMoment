import {
  DELETE_VIDEO_ERROR,
  DELETE_VIDEO_PROGRESS,
  DELETE_VIDEO_SUCCESS,
  GET_VIDEO_ERROR,
  GET_VIDEO_PROGRESS,
  GET_VIDEO_SUCCESS,
  POST_VIDEO_ERROR,
  POST_VIDEO_PROGRESS,
  POST_VIDEO_SUCCESS,
  UPDATE_VIDEO_ERROR,
  UPDATE_VIDEO_PROGRESS,
  UPDATE_VIDEO_SUCCESS,
} from "./videoAction";

const initialState = {
  video: [],
  isLoding: false,
  isError: null,
};

const videoReducer = (state = initialState, action) => {
  // console.log("hello my name is  -", action);
  switch (action.type) {
    case GET_VIDEO_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case GET_VIDEO_SUCCESS:
      return {
        ...state,
        isLoding: false,
        video: action.data.data,
        isError: null,
      };
    case GET_VIDEO_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case POST_VIDEO_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case POST_VIDEO_SUCCESS:
      return {
        ...state,
        isLoding: false,
        video: state.video.concat(action.data),
        isError: null,
      };
    case POST_VIDEO_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case DELETE_VIDEO_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case DELETE_VIDEO_SUCCESS:
      const filterVIDEO = state.video.filter((val) => val._id !== action.data);
      return {
        ...state,
        isLoding: false,
        video: filterVIDEO,
        isError: null,
      };
    case DELETE_VIDEO_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case UPDATE_VIDEO_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case UPDATE_VIDEO_SUCCESS:
      const updatedVIDEO = state.video.map((item) =>
        item._id === action.data._id ? action.data : item
      );

      console.log("action", action.data);
      console.log("updatedVIDEO", updatedVIDEO);

      return {
        ...state,
        isLoading: false,
        video: updatedVIDEO,
        isError: null,
      };

    case UPDATE_VIDEO_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    default:
      return { ...state };
  }
};

export default videoReducer;
