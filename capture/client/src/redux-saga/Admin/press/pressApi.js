import axios from "axios";
import {
  BASE_URL,
  DELETE_PRESS_API,
  GET_PRESS_API,
  POST_PRESS_API,
  UPDATE_PRESS_API,
} from "../../constant";

export async function get_press_api() {
  return axios
    .get(BASE_URL + GET_PRESS_API)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

export function post_press_api(action) {
  console.log(action, "action");
  return axios
    .post(BASE_URL + POST_PRESS_API, action.payload)
    .then((res) => {
      const data = res.data.data;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function delete_press_api(action) {
  return axios
    .delete(BASE_URL + DELETE_PRESS_API + action.payload._id)
    .then((res) => {
      const data = action.payload._id;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function update_press_api(action) {
  const id = action.payload.view._id;
  return axios
    .put(BASE_URL + UPDATE_PRESS_API + id, action.payload.formData)
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
