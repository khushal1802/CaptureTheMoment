import axios from "axios";
import {
  BASE_URL,
  DELETE_CONTACT_API,
  GET_CONTACT_API,
  POST_CONTACT_API,
  UPDATE_CONTACT_API,
} from "../../constant";

export async function get_contact_api() {
  return axios
    .get(BASE_URL + GET_CONTACT_API)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

export function post_contact_api(action) {
  console.log(action, "action");
  return axios
    .post(BASE_URL + POST_CONTACT_API, action.payload)
    .then((res) => {
      const data = res.data.data;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function delete_contact_api(action) {
  console.log(action.payload._id, "delete contact id");
  return axios
    .delete(BASE_URL + DELETE_CONTACT_API + action.payload._id)
    .then((res) => {
      const data = action.payload._id;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function update_contact_api(action) {
  const { fname, lname, email, phone, description } = action.payload;

  const updateData = {
    fname: fname,
    lname: lname,
    email: email,
    phone: phone,
    description: description,
  };
  return axios
    .put(BASE_URL + UPDATE_CONTACT_API + action.payload._id, updateData)
    .then((res) => {
      const data = res.data.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log(err);
    });
}
