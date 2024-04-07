import { takeLatest } from "@redux-saga/core/effects";
import { DELETE_COMMENT_PROGRESS, GET_COMMENT_PROGRESS, POST_COMMENT_PROGRESS, UPDATE_COMMENT_PROGRESS } from "../../Admin/comment/commentAction";
import {  handle_Delete_comment_api, handle_Get_comment_api,  handle_Post_comment_api, handle_Update_comment_api } from "../admin/manageComment";

export function* get_comment_saga() {
  yield takeLatest(GET_COMMENT_PROGRESS, handle_Get_comment_api);
}

export function* post_comment_saga() {
  yield takeLatest(POST_COMMENT_PROGRESS, handle_Post_comment_api);
}

export function* delete_comment_saga() {
  yield takeLatest(DELETE_COMMENT_PROGRESS, handle_Delete_comment_api);
}

export function* update_comment_saga() {
  yield takeLatest(UPDATE_COMMENT_PROGRESS, handle_Update_comment_api);
}