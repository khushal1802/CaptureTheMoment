import {
  DELETE_VIDEO_ERROR,
  DELETE_VIDEO_SUCCESS,
  GET_VIDEO_ERROR,
  GET_VIDEO_SUCCESS,
  POST_VIDEO_ERROR,
  POST_VIDEO_SUCCESS,
  UPDATE_VIDEO_ERROR,
  UPDATE_VIDEO_SUCCESS,
} from "../../Admin/video/videoAction";
import {
  delete_video_api,
  get_video_api,
  post_video_api,
  update_video_api,
} from "../../Admin/video/videoApi";
import { call, put } from "redux-saga/effects";

export function* handle_Get_video_api(action) {
  try {
    const res = yield call(get_video_api, action);
    console.log(res);
    const data = res.data;
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: GET_VIDEO_SUCCESS, data });
    } else {
      yield put({ type: GET_VIDEO_ERROR, data });
    }
  } catch (error) {
    yield put({ type: GET_VIDEO_ERROR, error });
  }
}

export function* handle_Post_video_api(action) {
  try {
    const res = yield call(post_video_api, action);
    console.log(res, "resssss");
    const data = res.data;
    console.log(data);
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: POST_VIDEO_SUCCESS, data });
    } else {
      yield put({ type: POST_VIDEO_ERROR, data });
    }
  } catch (error) {
    yield put({ type: POST_VIDEO_ERROR, error });
  }
}

export function* handle_Delete_video_api(action) {
  try {
    const res = yield call(delete_video_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: DELETE_VIDEO_SUCCESS, data });
    } else {
      yield put({ type: DELETE_VIDEO_ERROR, data });
    }
  } catch (error) {
    yield put({ type: DELETE_VIDEO_ERROR, error });
  }
}

export function* handle_Update_video_api(action) {
  try {
    const res = yield call(update_video_api, action);

    console.log(res, "ressssssssssssssss");
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: UPDATE_VIDEO_SUCCESS, data });
    } else {
      yield put({ type: UPDATE_VIDEO_ERROR, data });
    }
  } catch (error) {
    yield put({ type: UPDATE_VIDEO_ERROR, error });
  }
}
