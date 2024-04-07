const express = require("express");
const router = express();

const {paymentController}=require('../../controllers/index');
router.post('/create-payment', paymentController.createCustomer);

module.exports = router;