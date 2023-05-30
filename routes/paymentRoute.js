const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { protect } = require('../middlewares/auth');
const paymentController = require('../controllers/paymentController');
router.post('/orders', paymentController.orders);
router.post('/verify', paymentController.verify);
module.exports = router;
