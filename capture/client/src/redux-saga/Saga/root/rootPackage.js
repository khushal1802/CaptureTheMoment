import { takeLatest } from "@redux-saga/core/effects";
import {
  DELETE_PACKAGE_PROGRESS,
  GET_PACKAGE_PROGRESS,
  POST_PACKAGE_PROGRESS,
  UPDATE_PACKAGE_PROGRESS,
} from "../../Admin/package/packageAction";
import {
  handle_Delete_package_api,
  handle_Get_package_api,
  handle_Post_package_api,
  handle_Update_package_api,
} from "../admin/managePackage";

export function* get_package_saga() {
  yield takeLatest(GET_PACKAGE_PROGRESS, handle_Get_package_api);
}

export function* post_package_saga() {
  yield takeLatest(POST_PACKAGE_PROGRESS, handle_Post_package_api);
}

export function* delete_package_saga() {
  yield takeLatest(DELETE_PACKAGE_PROGRESS, handle_Delete_package_api);
}

export function* update_package_saga() {
  yield takeLatest(UPDATE_PACKAGE_PROGRESS, handle_Update_package_api);
}
