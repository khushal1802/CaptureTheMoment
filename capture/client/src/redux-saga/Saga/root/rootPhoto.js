import { takeLatest } from "@redux-saga/core/effects";
import { DELETE_PHOTO_PROGRESS, GET_PHOTO_PROGRESS, POST_PHOTO_PROGRESS, UPDATE_PHOTO_PROGRESS } from "../../Admin/photo/photoAction";
import { handle_Delete_photo_api, handle_Get_photo_api, handle_Post_photo_api, handle_Update_photo_api } from "../admin/managePhoto";

export function* get_photo_saga() {
  yield takeLatest(GET_PHOTO_PROGRESS, handle_Get_photo_api);
}

export function* post_photo_saga() {
  yield takeLatest(POST_PHOTO_PROGRESS, handle_Post_photo_api);
}

export function* delete_photo_saga() {
  yield takeLatest(DELETE_PHOTO_PROGRESS, handle_Delete_photo_api);
}

export function* update_photo_saga() {
  yield takeLatest(UPDATE_PHOTO_PROGRESS, handle_Update_photo_api);
}