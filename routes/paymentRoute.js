const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { protect } = require('../middlewares/auth');
const paymentController = require('../controllers/paymentController');
router.post('/orders', paymentController.orders);
router.post('/set-payment-id', paymentController.set);
router.post('/verify-payment-id', paymentController.verify);
module.exports = router;
