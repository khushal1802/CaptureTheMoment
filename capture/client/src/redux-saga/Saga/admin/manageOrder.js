import {
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  POST_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_SUCCESS,
} from "../../Admin/order/orderAction";
import {
  delete_order_api,
  get_order_api,
  post_order_api,
  update_order_api,
} from "../../Admin/order/orderApi";
import { call, put } from "redux-saga/effects";

export function* handle_Get_order_api(action) {
  try {
    const res = yield call(get_order_api, action);
    console.log(res);
    const data = res.data;
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: GET_ORDER_SUCCESS, data });
    } else {
      yield put({ type: GET_ORDER_ERROR, data });
    }
  } catch (error) {
    yield put({ type: GET_ORDER_ERROR, error });
  }
}
handle_Get_order_api();
export function* handle_Post_order_api(action) {
  console.log(action);
  try {
    const res = yield call(post_order_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: POST_ORDER_SUCCESS, data });
    } else {
      yield put({ type: POST_ORDER_ERROR, data });
    }
  } catch (error) {
    yield put({ type: POST_ORDER_ERROR, error });
  }
}

export function* handle_Delete_order_api(action) {
  try {
    const res = yield call(delete_order_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: DELETE_ORDER_SUCCESS, data });
    } else {
      yield put({ type: DELETE_ORDER_ERROR, data });
    }
  } catch (error) {
    yield put({ type: DELETE_ORDER_ERROR, error });
  }
}

export function* handle_Update_order_api(action) {
  try {
    const res = yield call(update_order_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: UPDATE_ORDER_SUCCESS, data });
    } else {
      yield put({ type: UPDATE_ORDER_ERROR, data });
    }
  } catch (error) {
    yield put({ type: UPDATE_ORDER_ERROR, error });
  }
}
