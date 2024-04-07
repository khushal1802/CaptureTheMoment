const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/schemavalidation.js");
const { orderValidation } = require("../../validation/index.js");
const { orderController } = require("../../controllers/index.js");

router.post(
  "/create",
  validate(orderValidation.orderCreateValidation),
  orderController.createOrder
);
router.get("/list", orderController.getOrderList);
/** Get order details by id */
router.get("/get-details/:orderId", orderController.getDetails);

router.put(
  "/update/:id",
  validate(orderValidation.orderUpdateValidation),
  orderController.updateOrder
);
router.delete(
  "/delete/:id",
  validate(orderValidation.orderDelelteValidation),
  orderController.deleteOrder
);

module.exports = router;
