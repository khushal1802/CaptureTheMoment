import axios from "axios";
import {
  BASE_URL,
  DELETE_TEAM_API,
  GET_TEAM_API,
  POST_TEAM_API,
  UPDATE_TEAM_API,
} from "../../constant";

export async function get_team_api() {
  return axios
    .get(BASE_URL + GET_TEAM_API)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

export function post_team_api(action) {
  console.log(action, "action");
  return axios
    .post(BASE_URL + POST_TEAM_API, action.payload)
    .then((res) => {
      const data = res.data.data;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function delete_team_api(action) {
  return axios
    .delete(BASE_URL + DELETE_TEAM_API + action.payload._id)
    .then((res) => {
      const data = action.payload._id;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function update_team_api(action) {
  const id = action.payload.view._id;
  return axios
    .put(BASE_URL + UPDATE_TEAM_API + id, action.payload.formData)
    .then((res) => {
      console.log(res, "resss");
      const data = res.data.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log(err);
    });
}
