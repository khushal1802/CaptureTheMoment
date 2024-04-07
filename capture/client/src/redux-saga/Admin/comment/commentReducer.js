import {
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_PROGRESS,
  DELETE_COMMENT_SUCCESS,
  GET_COMMENT_ERROR,
  GET_COMMENT_PROGRESS,
  GET_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  POST_COMMENT_PROGRESS,
  POST_COMMENT_SUCCESS,
  UPDATE_COMMENT_ERROR,
  UPDATE_COMMENT_PROGRESS,
  UPDATE_COMMENT_SUCCESS,
} from "./commentAction";

const initialState = {
  comment: [],
  isLoding: false,
  isError: null,
};

const commentReducer = (state = initialState, action) => {
  // console.log("hello my name is  -", action);
  switch (action.type) {
    case GET_COMMENT_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        isLoding: false,
        comment: action.data.data,
        isError: null,
      };
    case GET_COMMENT_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case POST_COMMENT_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        isLoding: false,
        comment: state.comment.concat(action.data),
        isError: null,
      };
    case POST_COMMENT_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case DELETE_COMMENT_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case DELETE_COMMENT_SUCCESS:
      const filterCOMMENT = state.comment.filter(
        (val) => val._id !== action.data
      );
      return {
        ...state,
        isLoding: false,
        comment: filterCOMMENT,
        isError: null,
      };
    case DELETE_COMMENT_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case UPDATE_COMMENT_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case UPDATE_COMMENT_SUCCESS:
      const updatedCOMMENT = state.comment.map((item) =>
        item._id === action.data._id ? action.data : item
      );

      console.log("action", action.data);
      console.log("updatedCOMMENT", updatedCOMMENT);

      return {
        ...state,
        isLoading: false,
        comment: updatedCOMMENT,
        isError: null,
      };

    case UPDATE_COMMENT_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    default:
      return { ...state };
  }
};

export default commentReducer;
