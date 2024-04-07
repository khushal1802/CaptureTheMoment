import { takeLatest } from "@redux-saga/core/effects";
import {
  DELETE_BLOG_PROGRESS,
  GET_BLOG_PROGRESS,
  POST_BLOG_PROGRESS,
  UPDATE_BLOG_PROGRESS,
} from "../../Admin/blog/blogAction";
import {
  handle_Delete_blog_api,
  handle_Get_blog_api,
  handle_Post_blog_api,
  handle_Update_blog_api,
} from "../admin/manageBlog";

export function* get_blog_saga() {
  yield takeLatest(GET_BLOG_PROGRESS, handle_Get_blog_api);
}

export function* post_blog_saga() {
  yield takeLatest(POST_BLOG_PROGRESS, handle_Post_blog_api);
}

export function* delete_blog_saga() {
  yield takeLatest(DELETE_BLOG_PROGRESS, handle_Delete_blog_api);
}

export function* update_blog_saga() {
  yield takeLatest(UPDATE_BLOG_PROGRESS, handle_Update_blog_api);
}
