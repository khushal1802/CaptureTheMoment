import axios from "axios";
import {
  BASE_URL,
  DELETE_PACKAGE_API,
  GET_PACKAGE_API,
  POST_PACKAGE_API,
  UPDATE_PACKAGE_API,
} from "../../constant";

export async function get_package_api() {
  return axios
    .get(BASE_URL + GET_PACKAGE_API)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

export function post_package_api(action) {
  console.log(action, "action");
  return axios
    .post(BASE_URL + POST_PACKAGE_API, action.payload)
    .then((res) => {
      const data = res.data.data;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function delete_package_api(action) {
  console.log(action.payload._id, "delete PACKAGE id");
  return axios
    .delete(BASE_URL + DELETE_PACKAGE_API + action.payload._id)
    .then((res) => {
      const data = action.payload._id;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function update_package_api(action) {
  const { title, price, fild, type, hours, member, album, description } = action.payload;
  const updateData = {
    title: title,
    price: price,
    fild: fild,
    type: type,
    hours: hours,
    member: member,
    album: album,
    description: description,
  }
  console.log(updateData, 'Update Data');
  return axios
    .put(BASE_URL + UPDATE_PACKAGE_API + action.payload._id, updateData)
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
