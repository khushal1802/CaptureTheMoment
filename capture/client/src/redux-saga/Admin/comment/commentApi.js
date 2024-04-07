import axios from "axios";
import {
  BASE_URL,
  DELETE_COMMENT_API,
  GET_COMMENT_API,
  POST_COMMENT_API,
  UPDATE_COMMENT_API,
} from "../../constant";

export async function get_comment_api() {
  return axios
    .get(BASE_URL + GET_COMMENT_API)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

export function post_comment_api(action) {
  console.log(action, "action");
  return axios
    .post(BASE_URL + POST_COMMENT_API, action.payload)
    .then((res) => {
      const data = res.data.data;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function delete_comment_api(action) {
  return axios
    .delete(BASE_URL + DELETE_COMMENT_API + action.payload._id)
    .then((res) => {
      const data = action.payload._id;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function update_comment_api(action) {
  const id = action.payload.view._id
  return axios
    .put(BASE_URL + UPDATE_COMMENT_API + id, action.payload.formData)
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
