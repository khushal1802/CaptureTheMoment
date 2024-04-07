import {
  DELETE_BLOG_ERROR,
  DELETE_BLOG_PROGRESS,
  DELETE_BLOG_SUCCESS,
  GET_BLOG_ERROR,
  GET_BLOG_PROGRESS,
  GET_BLOG_SUCCESS,
  POST_BLOG_ERROR,
  POST_BLOG_PROGRESS,
  POST_BLOG_SUCCESS,
  UPDATE_BLOG_ERROR,
  UPDATE_BLOG_PROGRESS,
  UPDATE_BLOG_SUCCESS,
} from "./blogAction";

const initialState = {
  blog: [],
  isLoding: false,
  isError: null,
};

const blogReducer = (state = initialState, action) => {
  // console.log("hello my name is  -", action);
  switch (action.type) {
    case GET_BLOG_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        isLoding: false,
        blog: action.data.data,
        isError: null,
      };
    case GET_BLOG_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case POST_BLOG_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case POST_BLOG_SUCCESS:
      return {
        ...state,
        isLoding: false,
        blog: state.blog.concat(action.data),
        isError: null,
      };
    case POST_BLOG_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case DELETE_BLOG_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case DELETE_BLOG_SUCCESS:
      const filterBLOG = state.blog.filter((val) => val._id !== action.data);
      return {
        ...state,
        isLoding: false,
        blog: filterBLOG,
        isError: null,
      };
    case DELETE_BLOG_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case UPDATE_BLOG_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case UPDATE_BLOG_SUCCESS:
      const updatedBLOG = state.blog.map((item) =>
        item._id === action.data._id ? action.data : item
      );

      console.log("action", action.data);
      console.log("updatedBLOG", updatedBLOG);

      return {
        ...state,
        isLoading: false,
        blog: updatedBLOG,
        isError: null,
      };

    case UPDATE_BLOG_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    default:
      return { ...state };
  }
};

export default blogReducer;
