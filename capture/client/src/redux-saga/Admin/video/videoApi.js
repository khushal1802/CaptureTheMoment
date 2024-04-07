import axios from "axios";
import {
  BASE_URL,
  DELETE_VIDEO_API,
  GET_VIDEO_API,
  POST_VIDEO_API,
  UPDATE_VIDEO_API,
} from "../../constant";

export async function get_video_api() {
  return axios
    .get(BASE_URL + GET_VIDEO_API)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

export function post_video_api(action) {
  console.log(action, "action");
  return axios
    .post(BASE_URL + POST_VIDEO_API, action.payload)
    .then((res) => {
      const data = res.data.data;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function delete_video_api(action) {
  return axios
    .delete(BASE_URL + DELETE_VIDEO_API + action.payload._id)
    .then((res) => {
      const data = action.payload._id;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function update_video_api(action) {
  const id = action.payload.view._id;
  return axios
    .put(BASE_URL + UPDATE_VIDEO_API + id, action.payload.formData)
    .then((res) => {
      console.log(res);
      const data = res.data.data;
      console.log(data);
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log(err);
    });
}
