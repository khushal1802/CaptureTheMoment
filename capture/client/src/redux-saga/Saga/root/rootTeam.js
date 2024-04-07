import { takeLatest } from "@redux-saga/core/effects";
import {
  DELETE_TEAM_PROGRESS,
  GET_TEAM_PROGRESS,
  POST_TEAM_PROGRESS,
  UPDATE_TEAM_PROGRESS,
} from "../../Admin/team/teamAction";
import {
  handle_Delete_team_api,
  handle_Get_team_api,
  handle_Post_team_api,
  handle_Update_team_api,
} from "../admin/manageTeam";

export function* get_team_saga() {
  yield takeLatest(GET_TEAM_PROGRESS, handle_Get_team_api);
}

export function* post_team_saga() {
  yield takeLatest(POST_TEAM_PROGRESS, handle_Post_team_api);
}

export function* delete_team_saga() {
  yield takeLatest(DELETE_TEAM_PROGRESS, handle_Delete_team_api);
}

export function* update_team_saga() {
  yield takeLatest(UPDATE_TEAM_PROGRESS, handle_Update_team_api);
}
