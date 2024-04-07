import axios from "axios";
import {
  BASE_URL,
  DELETE_ORDER_API,
  GET_ORDER_API,
  POST_ORDER_API,
  UPDATE_ORDER_API,
} from "../../constant";

export async function get_order_api() {
  return axios
    .get(BASE_URL + GET_ORDER_API)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}
export function post_order_api(action) {
  console.log(action.payload, "action");
  return axios
    .post(BASE_URL + POST_ORDER_API, action.payload)
    .then((res) => {
      const data = res.data;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function delete_order_api(action) {
  return axios
    .delete(BASE_URL + DELETE_ORDER_API + action.payload._id)
    .then((res) => {
      const data = action.payload._id;
      const status = res.status;
      return { data, status };
    })
    .catch((error) => {
      console.log(error);
    });
}

export function update_order_api(action) {
  console.log(action.payload, "update order api payload");
  const id = action.payload._id;
  const { name, email, date, address, price, title } = action.payload;

  const updateData = {
    name: name,
    email: email,
    date: date,
    address: address,
    price: price,
    title: title,
  };
  return axios
    .put(BASE_URL + UPDATE_ORDER_API + id, updateData)
    .then((res) => {
      console.log(
        res,
        "resss.............................................................."
      );
      const data = res.data.data;
      const status = res.status;
      return { data, status };
    })
    .catch((err) => {
      console.log(err);
    });
}
