import { takeLatest } from "@redux-saga/core/effects";
import {
  DELETE_PRESS_PROGRESS,
  GET_PRESS_PROGRESS,
  POST_PRESS_PROGRESS,
  UPDATE_PRESS_PROGRESS,
} from "../../Admin/press/pressAction";
import {
  handle_Delete_press_api,
  handle_Get_press_api,
  handle_Post_press_api,
  handle_Update_press_api,
} from "../admin/managePress";

export function* get_press_saga() {
  yield takeLatest(GET_PRESS_PROGRESS, handle_Get_press_api);
}

export function* post_press_saga() {
  yield takeLatest(POST_PRESS_PROGRESS, handle_Post_press_api);
}

export function* delete_press_saga() {
  yield takeLatest(DELETE_PRESS_PROGRESS, handle_Delete_press_api);
}

export function* update_press_saga() {
  yield takeLatest(UPDATE_PRESS_PROGRESS, handle_Update_press_api);
}
