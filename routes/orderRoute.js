const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Orders = require('../models/orderModel');
const { protect } = require('../middlewares/auth');

router.get(
	'/orders',
	protect,
	asyncHandler(async (req, res) => {
		// const {
		// 	title,
		//    orderId,
		// 	paymentId,
		// 	totalAmount,
		// 	paymentStatus,
		// 	modeOfPayment,
		// 	phone,
		// 	houseNo,
		// 	AreaColony,
		// 	pincode,
		// 	city,
		// 	state,
		// 	typeOfAddress,
		// 	isDelivered,
		// } = req.body;
		// console.log('try', req.user);
		if (req.user.role == 'ADMIN') {
			const orders = await Orders.find({});
			res.status(200).json({ orders });
		}
	})
);
router.post(
	'/add-order',
	protect,
	asyncHandler(async (req, res) => {
		const {
			title,
			orderId,
			paymentId,
			totalAmount,
			paymentStatus,
			modeOfPayment,
			phone,
			houseNo,
			AreaColony,
			pincode,
			city,
			state,
			typeOfAddress,
			isDelivered,
			isTrue,
		} = req.body;
		const order = await Orders.create({
			title: title,
			orderId: orderId,
			paymentId: paymentId,
			totalAmount: totalAmount,
			paymentStatus: paymentStatus,
			modeOfPayment: modeOfPayment,
			phone: phone,
			houseNo: houseNo,
			AreaColony: AreaColony,
			pincode: pincode,
			city: city,
			state: state,
			typeOfAddress: typeOfAddress,
			isDelivered: isDelivered,
			isTrue: isTrue,
		});
		res.status(200).json({ order });
	})
);
// router.delete('/delete-order', protect);
router.put(
	'/update-order',
	protect,
	asyncHandler(async (req, res) => {
		const {
			orderId,
			paymentStatus,
			modeOfPayment,
			phone,
			pincode,
			AreaColony,
			city,
			isDelivered,
			isTrue,
		} = req.body;
		try {
			if (req.user.role == 'ADMIN') {
				const order = await Product.findOne({ orderId: orderId });
				console.log(order);
				if (order) {
					order.paymentStatus = paymentStatus;
					order.modeOfPayment = modeOfPayment;
					order.phone = phone;
					order.pincode = pincode;
					order.AreaColony = AreaColony;
					order.city = city;
					order.isDelivered = isDelivered;
					order.isTrue = isTrue;
					await order.save();
					res.status(200).json({ message: 'Order updated succesfully' });
				} else {
					// console.log('eoorr ');
					throw Error('No Order found');
				}
			}
		} catch (err) {
			res.status(400).json({ message: 'No order found' });
		}
	})
);
module.exports = router;
