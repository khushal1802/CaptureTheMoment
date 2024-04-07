import {
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  GET_COMMENT_ERROR,
  GET_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,
  POST_COMMENT_SUCCESS,
  UPDATE_COMMENT_ERROR,
  UPDATE_COMMENT_SUCCESS,
} from "../../Admin/comment/commentAction";
import {
  delete_comment_api,
  get_comment_api,
  post_comment_api,
  update_comment_api,
} from "../../Admin/comment/commentApi";
import { call, put } from "redux-saga/effects";

export function* handle_Get_comment_api(action) {
  try {
    const res = yield call(get_comment_api, action);
    console.log(res);
    const data = res.data;
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: GET_COMMENT_SUCCESS, data });
    } else {
      yield put({ type: GET_COMMENT_ERROR, data });
    }
  } catch (error) {
    yield put({ type: GET_COMMENT_ERROR, error });
  }
}

export function* handle_Post_comment_api(action) {
  try {
    const res = yield call(post_comment_api, action);
    console.log(res, "resssss");
    const data = res.data;
    console.log(data);
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: POST_COMMENT_SUCCESS, data });
    } else {
      yield put({ type: POST_COMMENT_ERROR, data });
    }
  } catch (error) {
    yield put({ type: POST_COMMENT_ERROR, error });
  }
}

export function* handle_Delete_comment_api(action) {
  try {
    const res = yield call(delete_comment_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: DELETE_COMMENT_SUCCESS, data });
    } else {
      yield put({ type: DELETE_COMMENT_ERROR, data });
    }
  } catch (error) {
    yield put({ type: DELETE_COMMENT_ERROR, error });
  }
}

export function* handle_Update_comment_api(action) {
  try {
    const res = yield call(update_comment_api, action);

    console.log(res, "ressssssssssssssss");
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: UPDATE_COMMENT_SUCCESS, data });
    } else {
      yield put({ type: UPDATE_COMMENT_ERROR, data });
    }
  } catch (error) {
    yield put({ type: UPDATE_COMMENT_ERROR, error });
  }
}
