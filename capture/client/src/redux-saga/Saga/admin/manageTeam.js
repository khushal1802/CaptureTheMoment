import {
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_ERROR,
  GET_TEAM_ERROR,
  GET_TEAM_SUCCESS,
  POST_TEAM_ERROR,
  POST_TEAM_SUCCESS,
  UPDATE_TEAM_ERROR,
  UPDATE_TEAM_SUCCESS,
} from "../../Admin/team/teamAction";
import {
  delete_team_api,
  get_team_api,
  post_team_api,
  update_team_api,
} from "../../Admin/team/teamApi";
import { call, put } from "redux-saga/effects";

export function* handle_Get_team_api(action) {
  try {
    const res = yield call(get_team_api, action);
    console.log(res);
    const data = res.data;
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: GET_TEAM_SUCCESS, data });
    } else {
      yield put({ type: GET_TEAM_ERROR, data });
    }
  } catch (error) {
    yield put({ type: GET_TEAM_ERROR, error });
  }
}

export function* handle_Post_team_api(action) {
  try {
    const res = yield call(post_team_api, action);
    console.log(res, "resssss");
    const data = res.data;
    console.log(data);
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: POST_TEAM_SUCCESS, data });
    } else {
      yield put({ type: POST_TEAM_ERROR, data });
    }
  } catch (error) {
    yield put({ type: POST_TEAM_ERROR, error });
  }
}

export function* handle_Delete_team_api(action) {
  try {
    const res = yield call(delete_team_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: DELETE_TEAM_SUCCESS, data });
    } else {
      yield put({ type: DELETE_TEAM_ERROR, data });
    }
  } catch (error) {
    yield put({ type: DELETE_TEAM_ERROR, error });
  }
}

export function* handle_Update_team_api(action) {
  try {
    const res = yield call(update_team_api, action);

    console.log(res, "ressssssssssssssss");
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: UPDATE_TEAM_SUCCESS, data });
    } else {
      yield put({ type: UPDATE_TEAM_ERROR, data });
    }
  } catch (error) {
    yield put({ type: UPDATE_TEAM_ERROR, error });
  }
}
