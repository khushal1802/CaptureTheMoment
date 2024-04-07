import axios from "axios";
import {
  BASE_URL,
  DELETE_USER_API,
  GET_USER_API,
  POST_USER_API,
  UPDATE_USER_API,
} from "../../constant";

export async function get_user_api() {
  return axios
    .get(BASE_URL + GET_USER_API)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

export function post_user_api(action) {
  console.log(action, "action");
  return axios
    .post(BASE_URL + POST_USER_API, action.payload)
    .then((res) => {
      console.log(res);
      const data = res.data.Data;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function delete_user_api(action) {
  return axios
    .delete(BASE_URL + DELETE_USER_API + action.payload._id)
    .then((res) => {
      const data = action.payload._id;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function update_user_api(action) {
  const id = action.payload.view._id;
  return axios
    .put(BASE_URL + UPDATE_USER_API + id, action.payload.formData)
    .then((res) => {
      console.log(res, "resss");
      const data = res.data.Data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log(err);
    });
}
