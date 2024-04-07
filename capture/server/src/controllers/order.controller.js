const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { orderService, emailService } = require("../services/index.js");
const ejs = require("ejs");
const path = require("path");

/** Create order*/
const createOrder = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdOrder = await orderService.createOrder(reqBody);

    if (!createdOrder) {
      throw new Error("Something went wrong, please try again or later!");
    }
    const id = createdOrder.id;
    ejs.renderFile(
      path.join(__dirname, "../views/otp-template.ejs"),
      {
        email: reqBody.email,
        otp: ("0".repeat(4) + Math.floor(Math.random() * 10 ** 4)).slice(-4),
        msg: "your ordred conform",
        Name: reqBody.name,
        Date: reqBody.date,
        Address: reqBody.address,
        price: reqBody.price,
        title: reqBody.title,
      },
      async (err, data) => {
        if (err) {
          let authCreated = await authService.getAuthByEmail(reqBody.email);
          if (authCreated) {
            await authService.deleteAuthByEmail(reqBody.email);
          }
          throw new Error("Something went wrong, please try again.");
        } else {
          emailService.sendMail(reqBody.email, data, "Verify Email");
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "ordercreate successfully!",
      data: { createdOrder, id },
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get orderdetails */
const getDetails = async (req, res) => {
  try {
    const orderExists = await orderService.getOrderById(req.params.orderId);
    if (!orderExists) {
      throw new Error("ordernot found!");
    }

    res.status(200).json({
      success: true,
      message: "orderdetails get successfully!",
      data: orderExists,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Get orderlist */
const getOrderList = async (req, res) => {
  try {
    const getList = await orderService.getOrderList();

    res.status(200).json({
      success: true,
      data: getList,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Update orderdetails */
const updateOrder = async (req, res) => {
  try {
    const reqBody = req.body;
    const orderId = req.params.id;
    const orderExists = await orderService.getOrderById(orderId);
    if (!orderExists) {
      throw new Error("ordernot found!");
    }
    const updatedorder = await orderService.updateOrder(orderId, reqBody);
    res.status(200).json({
      success: true,
      message: "orderdetails update successfully!",
      data: updatedorder,
    });
  } catch (error) {
    res.status(error?.statusCode || 400).json({
      success: false,
      message:
        error?.message || "Something went wrong, please try again or later!",
    });
  }
};

/** Delete order*/
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderExists = await orderService.getOrderById(orderId);
    if (!orderExists) {
      throw new Error("ordernot found!");
    }

    await orderService.deleteOrder(orderId);

    res.status(200).json({
      success: true,
      message: "order delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/** Send mail to reqested email */
const sendMail = async (req, res) => {
  try {
    const reqBody = req.body;
    const sendEmail = await emailService.sendMail(
      reqBody.email,
      reqBody.subject,
      reqBody.text
    );
    console.log(sendEmail);
    if (!sendEmail) {
      throw new Error("Something went wrong, please try again or later.");
    }

    res
      .status(200)
      .json({ success: true, message: "Email send successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  createOrder,
  getDetails,
  getOrderList,
  updateOrder,
  deleteOrder,
  sendMail,
};
