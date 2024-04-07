const { Order } = require("../models/index");

const getOrderById = async (orderId) => {
  return Order.findOne({ _id: orderId });
};

const getOrderList = async () => {
  return Order.find();
};

const createOrder = async (reqBody) => {
  return Order.create(reqBody);
};

const updateOrder = async (orderId, updateBody) => {
  return Order.findOneAndUpdate(
    { _id: orderId },
    { $set: updateBody },
    { new: true }
  );
};

const deleteOrder = async (orderId) => {
  return Order.findOneAndDelete({ _id: orderId });
};

module.exports = {
  getOrderById,
  getOrderList,
  createOrder,
  updateOrder,
  deleteOrder,
};
