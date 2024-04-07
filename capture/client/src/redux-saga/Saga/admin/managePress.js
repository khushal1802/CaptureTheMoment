
import {
  DELETE_PRESS_SUCCESS,
  DELETE_PRESS_ERROR,
  GET_PRESS_ERROR,
  GET_PRESS_SUCCESS,
  POST_PRESS_ERROR,
  POST_PRESS_SUCCESS,
  UPDATE_PRESS_ERROR,
  UPDATE_PRESS_SUCCESS,
} from "../../Admin/press/pressAction";
import {
  delete_press_api,
  get_press_api,
  post_press_api,
  update_press_api,
} from "../../Admin/press/pressApi";
import { call, put } from "redux-saga/effects";

export function* handle_Get_press_api(action) {
  try {
    const res = yield call(get_press_api, action);
    console.log(res);
    const data = res.data;
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: GET_PRESS_SUCCESS, data });
    } else {
      yield put({ type: GET_PRESS_ERROR, data });
    }
  } catch (error) {
    yield put({ type: GET_PRESS_ERROR, error });
  }
}

export function* handle_Post_press_api(action) {
  try {
    const res = yield call(post_press_api, action);
    console.log(res, "resssss");
    const data = res.data;
    console.log(data);
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: POST_PRESS_SUCCESS, data });
    } else {
      yield put({ type: POST_PRESS_ERROR, data });
    }
  } catch (error) {
    yield put({ type: POST_PRESS_ERROR, error });
  }
}

export function* handle_Delete_press_api(action) {
  try {
    const res = yield call(delete_press_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: DELETE_PRESS_SUCCESS, data });
    } else {
      yield put({ type: DELETE_PRESS_ERROR, data });
    }
  } catch (error) {
    yield put({ type: DELETE_PRESS_ERROR, error });
  }
}

export function* handle_Update_press_api(action) {
  try {
    const res = yield call(update_press_api, action);

    console.log(res, "ressssssssssssssss");
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: UPDATE_PRESS_SUCCESS, data });
    } else {
      yield put({ type: UPDATE_PRESS_ERROR, data });
    }
  } catch (error) {
    yield put({ type: UPDATE_PRESS_ERROR, error });
  }
}
