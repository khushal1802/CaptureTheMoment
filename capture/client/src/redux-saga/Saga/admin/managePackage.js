import {
  DELETE_PACKAGE_ERROR,
  DELETE_PACKAGE_SUCCESS,
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
  POST_PACKAGE_ERROR,
  POST_PACKAGE_SUCCESS,
  UPDATE_PACKAGE_ERROR,
  UPDATE_PACKAGE_SUCCESS,
} from "../../Admin/package/packageAction";
import {
  delete_package_api,
  get_package_api,
  post_package_api,
  update_package_api,
} from "../../Admin/package/packageApi";
import { call, put } from "redux-saga/effects";

export function* handle_Get_package_api(action) {
  try {
    const res = yield call(get_package_api, action);
    console.log(res);
    const data = res.data;
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: GET_PACKAGE_SUCCESS, data });
    } else {
      yield put({ type: GET_PACKAGE_ERROR, data });
    }
  } catch (error) {
    yield put({ type: GET_PACKAGE_ERROR, error });
  }
}

export function* handle_Post_package_api(action) {
  try {
    const res = yield call(post_package_api, action);
    console.log(res, "resssss");
    const data = res.data;
    console.log(data);
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: POST_PACKAGE_SUCCESS, data });
    } else {
      yield put({ type: POST_PACKAGE_ERROR, data });
    }
  } catch (error) {
    yield put({ type: POST_PACKAGE_ERROR, error });
  }
}

export function* handle_Delete_package_api(action) {
  try {
    const res = yield call(delete_package_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: DELETE_PACKAGE_SUCCESS, data });
    } else {
      yield put({ type: DELETE_PACKAGE_ERROR, data });
    }
  } catch (error) {
    yield put({ type: DELETE_PACKAGE_ERROR, error });
  }
}

export function* handle_Update_package_api(action) {
  try {
    const res = yield call(update_package_api, action);

    console.log(res, "ressssssssssssssss");
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: UPDATE_PACKAGE_SUCCESS, data });
    } else {
      yield put({ type: UPDATE_PACKAGE_ERROR, data });
    }
  } catch (error) {
    yield put({ type: UPDATE_PACKAGE_ERROR, error });
  }
}
