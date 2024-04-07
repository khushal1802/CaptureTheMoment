import { takeLatest } from "@redux-saga/core/effects";
import {
  DELETE_CONTACT_PROGRESS,
  GET_CONTACT_PROGRESS,
  POST_CONTACT_PROGRESS,
  UPDATE_CONTACT_PROGRESS,
} from "../../Admin/contact/contactAction";
import {
  handle_Delete_contact_api,
  handle_Get_contact_api,
  handle_Post_contact_api,
  handle_Update_contact_api,
} from "../admin/manageContact";

export function* get_contact_saga() {
  yield takeLatest(GET_CONTACT_PROGRESS, handle_Get_contact_api);
}

export function* post_contact_saga() {
  yield takeLatest(POST_CONTACT_PROGRESS, handle_Post_contact_api);
}

export function* delete_contact_saga() {
  yield takeLatest(DELETE_CONTACT_PROGRESS, handle_Delete_contact_api);
}

export function* update_contact_saga() {
  yield takeLatest(UPDATE_CONTACT_PROGRESS, handle_Update_contact_api);
}
