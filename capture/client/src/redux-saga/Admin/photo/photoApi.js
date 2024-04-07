import axios from "axios";
import {
  BASE_URL,
  DELETE_PHOTO_API,
  GET_PHOTO_API,
  POST_PHOTO_API,
  UPDATE_PHOTO_API,
} from "../../constant";

export async function get_photo_api() {
  return axios
    .get(BASE_URL + GET_PHOTO_API)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

export function post_photo_api(action) {
  console.log(action, "action");
  return axios
    .post(BASE_URL + POST_PHOTO_API, action.payload)
    .then((res) => {
      const data = res.data.data;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function delete_photo_api(action) {
  return axios
    .delete(BASE_URL + DELETE_PHOTO_API + action.payload._id)
    .then((res) => {
      const data = action.payload._id;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function update_photo_api(action) {
  const id = action.payload.view._id;
  return axios
    .put(BASE_URL + UPDATE_PHOTO_API + id, action.payload.formData)
    .then((res) => {
      const data = res.data.data;
      console.log(data);
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log(err);
    });
}
