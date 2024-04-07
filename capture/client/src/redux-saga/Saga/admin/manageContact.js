import {
  DELETE_CONTACT_ERROR,
  DELETE_CONTACT_SUCCESS,
  GET_CONTACT_ERROR,
  GET_CONTACT_SUCCESS,
  POST_CONTACT_ERROR,
  POST_CONTACT_SUCCESS,
  UPDATE_CONTACT_ERROR,
  UPDATE_CONTACT_SUCCESS,
} from "../../Admin/contact/contactAction";
import {
  delete_contact_api,
  get_contact_api,
  post_contact_api,
  update_contact_api,
} from "../../Admin/contact/contactApi";
import { call, put } from "redux-saga/effects";

export function* handle_Get_contact_api(action) {
  try {
    const res = yield call(get_contact_api, action);
    console.log(res);
    const data = res.data;
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: GET_CONTACT_SUCCESS, data });
    } else {
      yield put({ type: GET_CONTACT_ERROR, data });
    }
  } catch (error) {
    yield put({ type: GET_CONTACT_ERROR, error });
  }
}

export function* handle_Post_contact_api(action) {
  try {
    const res = yield call(post_contact_api, action);
    console.log(res, "resssss");
    const data = res.data;
    console.log(data);
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({ type: POST_CONTACT_SUCCESS, data });
    } else {
      yield put({ type: POST_CONTACT_ERROR, data });
    }
  } catch (error) {
    yield put({ type: POST_CONTACT_ERROR, error });
  }
}

export function* handle_Delete_contact_api(action) {
  try {
    const res = yield call(delete_contact_api, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: DELETE_CONTACT_SUCCESS, data });
    } else {
      yield put({ type: DELETE_CONTACT_ERROR, data });
    }
  } catch (error) {
    yield put({ type: DELETE_CONTACT_ERROR, error });
  }
}

export function* handle_Update_contact_api(action) {
  try {
    const res = yield call(update_contact_api, action);

    console.log(res, "ressssssssssssssss");
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({ type: UPDATE_CONTACT_SUCCESS, data });
    } else {
      yield put({ type: UPDATE_CONTACT_ERROR, data });
    }
  } catch (error) {
    yield put({ type: UPDATE_CONTACT_ERROR, error });
  }
}
