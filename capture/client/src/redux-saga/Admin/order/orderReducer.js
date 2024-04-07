import {
  DELETE_ORDER_ERROR,
  DELETE_ORDER_PROGRESS,
  DELETE_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  GET_ORDER_PROGRESS,
  GET_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  POST_ORDER_PROGRESS,
  POST_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_PROGRESS,
  UPDATE_ORDER_SUCCESS,
} from "./orderAction";

const initialState = {
  order: [],
  isLoding: false,
  isError: null,
};

const orderReducer = (state = initialState, action) => {
  console.log("hello my name is  -", action);
  switch (action.type) {
    case GET_ORDER_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        isLoding: false,
        order: action.data.data,
        isError: null,
      };
    case GET_ORDER_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case POST_ORDER_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        isLoding: false,
        order: state.order.concat(action.data),
        isError: null,
      };
    case POST_ORDER_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case DELETE_ORDER_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case DELETE_ORDER_SUCCESS:
      const filterORDER = state.order.filter((val) => val._id !== action.data);
      return {
        ...state,
        isLoding: false,
        order: filterORDER,
        isError: null,
      };
    case DELETE_ORDER_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    case UPDATE_ORDER_PROGRESS:
      return {
        ...state,
        isLoding: true,
        isError: null,
      };
    case UPDATE_ORDER_SUCCESS:
      const updatedORDER = state.order.map((item) =>
        item._id === action.data._id ? action.data : item
      );

      console.log("action", action.data);
      console.log("updatedORDER", updatedORDER);

      return {
        ...state,
        isLoading: false,
        order: updatedORDER,
        isError: null,
      };

    case UPDATE_ORDER_ERROR:
      return {
        ...state,
        isLoding: false,
        isError: action.data,
      };

    default:
      return { ...state };
  }
};

export default orderReducer;
