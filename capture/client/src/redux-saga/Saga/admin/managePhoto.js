import {
  DELETE_PHOTO_ERROR,
  DELETE_PHOTO_SUCCESS,
  GET_PHOTO_ERROR,
  GET_PHOTO_SUCCESS,
  POST_PHOTO_ERROR,
  POST_PHOTO_SUCCESS,
  UPDATE_PHOTO_ERROR,
  UPDATE_PHOTO_SUCCESS,
} from "../../Admin/photo/photoAction";
import {
  delete_photo_api,
  get_photo_api,
  post_photo_api,
  update_photo_api,
} from "../../Admin/photo/photoApi";
import { call, put } from "redux-saga/effects";

export function* handle_Get_photo_api(action) {
  try {
    const res = yield call(get_photo_api, action);
    console.log(res);
    const data = res.data;
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: GET_PHOTO_SUCCESS, data });
    } else {
      yield put({ type: GET_PHOTO_ERROR, data });
    }
  } catch (error) {
    yield put({ type: GET_PHOTO_ERROR, error });
  }
}

export function* handle_Post_photo_api(action) {
  try {
    const res = yield call(post_photo_api, action);
    console.log(res, "resssss");
    const data = res.data;
    console.log(data);
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: POST_PHOTO_SUCCESS, data });
    } else {
      yield put({ type: POST_PHOTO_ERROR, data });
    }
  } catch (error) {
    yield put({ type: POST_PHOTO_ERROR, error });
  }
}

export function* handle_Delete_photo_api(action) {
  try {
    const res = yield call(delete_photo_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: DELETE_PHOTO_SUCCESS, data });
    } else {
      yield put({ type: DELETE_PHOTO_ERROR, data });
    }
  } catch (error) {
    yield put({ type: DELETE_PHOTO_ERROR, error });
  }
}

export function* handle_Update_photo_api(action) {
  try {
    const res = yield call(update_photo_api, action);

    console.log(res, "ressssssssssssssss");
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: UPDATE_PHOTO_SUCCESS, data });
    } else {
      yield put({ type: UPDATE_PHOTO_ERROR, data });
    }
  } catch (error) {
    yield put({ type: UPDATE_PHOTO_ERROR, error });
  }
}
