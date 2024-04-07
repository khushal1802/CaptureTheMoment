import { takeLatest } from "@redux-saga/core/effects";
import {
  DELETE_VIDEO_PROGRESS,
  GET_VIDEO_PROGRESS,
  POST_VIDEO_PROGRESS,
  UPDATE_VIDEO_PROGRESS,
} from "../../Admin/video/videoAction";
import {
  handle_Delete_video_api,
  handle_Get_video_api,
  handle_Post_video_api,
  handle_Update_video_api,
} from "../admin/manageVideo";

export function* get_video_saga() {
  yield takeLatest(GET_VIDEO_PROGRESS, handle_Get_video_api);
}

export function* post_video_saga() {
  yield takeLatest(POST_VIDEO_PROGRESS, handle_Post_video_api);
}

export function* delete_video_saga() {
  yield takeLatest(DELETE_VIDEO_PROGRESS, handle_Delete_video_api);
}

export function* update_video_saga() {
  yield takeLatest(UPDATE_VIDEO_PROGRESS, handle_Update_video_api);
}
