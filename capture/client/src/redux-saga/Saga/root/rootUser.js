import { takeLatest } from "@redux-saga/core/effects";
import { DELETE_USER_PROGRESS, GET_USER_PROGRESS, POST_USER_PROGRESS, UPDATE_USER_PROGRESS } from "../../Admin/user/userAction";
import { handle_Delete_user_api, handle_Get_user_api, handle_Post_user_api, handle_Update_user_api } from "../admin/manageUser";

export function* get_user_saga() {
  yield takeLatest(GET_USER_PROGRESS, handle_Get_user_api);
}

export function* post_user_saga() {
  yield takeLatest(POST_USER_PROGRESS, handle_Post_user_api);
}

export function* delete_user_saga() {
  yield takeLatest(DELETE_USER_PROGRESS, handle_Delete_user_api);
}

export function* update_user_saga() {
  yield takeLatest(UPDATE_USER_PROGRESS, handle_Update_user_api);
}