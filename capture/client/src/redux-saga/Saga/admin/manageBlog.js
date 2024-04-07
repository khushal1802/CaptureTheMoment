
import {
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_ERROR,
  GET_BLOG_ERROR,
  GET_BLOG_SUCCESS,
  POST_BLOG_ERROR,
  POST_BLOG_SUCCESS,
  UPDATE_BLOG_ERROR,
  UPDATE_BLOG_SUCCESS,
} from "../../Admin/blog/blogAction";
import {
  delete_blog_api,
  get_blog_api,
  post_blog_api,
  update_blog_api,
} from "../../Admin/blog/blogApi";
import { call, put } from "redux-saga/effects";

export function* handle_Get_blog_api(action) {
  try {
    const res = yield call(get_blog_api, action);
    console.log(res);
    const data = res.data;
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: GET_BLOG_SUCCESS, data });
    } else {
      yield put({ type: GET_BLOG_ERROR, data });
    }
  } catch (error) {
    yield put({ type: GET_BLOG_ERROR, error });
  }
}

export function* handle_Post_blog_api(action) {
  try {
    const res = yield call(post_blog_api, action);
    console.log(res, "resssss");
    const data = res.data;
    console.log(data);
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: POST_BLOG_SUCCESS, data });
    } else {
      yield put({ type: POST_BLOG_ERROR, data });
    }
  } catch (error) {
    yield put({ type: POST_BLOG_ERROR, error });
  }
}

export function* handle_Delete_blog_api(action) {
  try {
    const res = yield call(delete_blog_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: DELETE_BLOG_SUCCESS, data });
    } else {
      yield put({ type: DELETE_BLOG_ERROR, data });
    }
  } catch (error) {
    yield put({ type: DELETE_BLOG_ERROR, error });
  }
}

export function* handle_Update_blog_api(action) {
  try {
    const res = yield call(update_blog_api, action);

    console.log(res, "ressssssssssssssss");
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: UPDATE_BLOG_SUCCESS, data });
    } else {
      yield put({ type: UPDATE_BLOG_ERROR, data });
    }
  } catch (error) {
    yield put({ type: UPDATE_BLOG_ERROR, error });
  }
}
