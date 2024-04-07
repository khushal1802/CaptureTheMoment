const express = require("express");
const router = express.Router();
const authRoute = require("../v1/auth.route");
const photoRoute = require("../v1/photo.route");
const videoRoute = require("../v1/video.route");
const blogRoute = require("../v1/blog.route");
const teamRoute = require("../v1/team.route");
const pressRoute = require("../v1/press.route");
const contactRoute = require("../v1/contact.route");
const commentRoute = require("../v1/comment.route");
const packageRoute = require("../v1/package.route");
const paymentRoute = require("../v1/payment.route");
const orderRoute = require("../v1/order.route");


router.use("/auth", authRoute);
router.use("/photo", photoRoute);
router.use("/video", videoRoute);
router.use("/blog", blogRoute);
router.use("/team", teamRoute);
router.use("/press", pressRoute);
router.use("/contact", contactRoute);
router.use("/comment", commentRoute);
router.use("/package", packageRoute);
router.use("/payment", paymentRoute);
router.use("/order", orderRoute);


module.exports = router;
