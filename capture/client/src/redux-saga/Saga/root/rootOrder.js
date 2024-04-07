import { takeLatest } from "@redux-saga/core/effects";
import {
  DELETE_ORDER_PROGRESS,
  GET_ORDER_PROGRESS,
  POST_ORDER_PROGRESS,
  UPDATE_ORDER_PROGRESS,
} from "../../Admin/order/orderAction";
import {
  handle_Delete_order_api,
  handle_Get_order_api,
  handle_Post_order_api,
  handle_Update_order_api,
} from "../admin/manageOrder";

export function* get_order_saga() {
  yield takeLatest(GET_ORDER_PROGRESS, handle_Get_order_api);
}

export function* post_order_saga() {
  yield takeLatest(POST_ORDER_PROGRESS, handle_Post_order_api);
}

export function* delete_order_saga() {
  yield takeLatest(DELETE_ORDER_PROGRESS, handle_Delete_order_api);
}

export function* update_order_saga() {
  yield takeLatest(UPDATE_ORDER_PROGRESS, handle_Update_order_api);
}
