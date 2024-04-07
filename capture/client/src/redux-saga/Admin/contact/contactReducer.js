import {
  DELETE_CONTACT_ERROR,
  DELETE_CONTACT_PROGRESS,
  DELETE_CONTACT_SUCCESS,
  GET_CONTACT_ERROR,
  GET_CONTACT_PROGRESS,
  GET_CONTACT_SUCCESS,
  POST_CONTACT_ERROR,
  POST_CONTACT_PROGRESS,
  POST_CONTACT_SUCCESS,
  UPDATE_CONTACT_ERROR,
  UPDATE_CONTACT_PROGRESS,
  UPDATE_CONTACT_SUCCESS,
} from "./contactAction";

const initialState = {
  contact: [],
  isLoding: false,
  isError: null,
};

const contactReducer = (state = initialState, action) => {
  // console.log("hello my name is  -", action);
  switch (action.type) {
    case GET_CONTACT_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case GET_CONTACT_SUCCESS:
      return {
        ...state,
        isLoding: false,
        contact: action.data.data,
        isError: null,
      };
    case GET_CONTACT_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case POST_CONTACT_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case POST_CONTACT_SUCCESS:
      return {
        ...state,
        isLoding: false,
        contact: state.contact.concat(action.data),
        isError: null,
      };
    case POST_CONTACT_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case DELETE_CONTACT_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case DELETE_CONTACT_SUCCESS:
      const filterCONTACT = state.contact.filter(
        (val) => val._id !== action.data
      );
      return {
        ...state,
        isLoding: false,
        contact: filterCONTACT,
        isError: null,
      };
    case DELETE_CONTACT_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case UPDATE_CONTACT_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case UPDATE_CONTACT_SUCCESS:
      console.log("action", action.data._id);
      console.log("action", action.data);
      const updatedCONTACT = state.contact.map((item) =>
        item._id === action.data._id ? action.data : item
      );
      console.log("updatedCONTACT", updatedCONTACT);

      return {
        ...state,
        isLoading: false,
        contact: updatedCONTACT,
        isError: null,
      };

    case UPDATE_CONTACT_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    default:
      return { ...state };
  }
};

export default contactReducer;
