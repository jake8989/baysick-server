const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Orders = require('../models/orderModel');
const { protect } = require('../middlewares/auth');
const sgMail = require('@sendgrid/mail');
const env = require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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
			customerId,
			paymentId,
			totalAmount,
			orderItems,
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
			DateOfOrdered,
			DateOfDelivery,
		} = req.body;
		const order = await Orders.create({
			title: title,
			orderId: orderId,
			customerId: customerId,
			paymentId: paymentId,
			totalAmount: totalAmount,
			orderItems: orderItems,
			paymentStatus: paymentStatus,
			modeOfPayment: modeOfPayment,
			phone: phone,
			houseNo: houseNo,
			AreaColony: AreaColony,
			pincode: pincode,
			city: city,
			state: state,
			typeOfAddress: typeOfAddress,
			DateOfOrdered: DateOfOrdered,
			DateOfDelivery: DateOfDelivery,
			isDelivered: isDelivered,
			isTrue: isTrue,
		});
		// console.log(req/);
		// const emailData = {
		// 	from: {
		// 		name: 'BAYSICK',
		// 		email: process.env.EMAIL_FROM,
		// 	},
		// 	to: 'manitjayant@gmail.com',
		// 	subject: `Orders Details`,
		// 	html: `
		//                  <h1>Ordere Successfully Recieved</h1>
		//                  <p>Order Details</p>
		//                  <hr />
		//                  <p>Order Id ${orderId}</p>
		//                  <p>Total amount of ${totalAmount}</p>
		//                  <p>The order will be delivered on ${76}</p>
		//              `,
		// };
		// sgMail
		// 	.send(emailData)
		// 	.then((sent) => {
		// 		console.log('email has been sent');
		// 	})
		// 	.catch((err) => {
		// 		return res.json({
		// 			message: err.message,
		// 		});
		// 	});

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
			totalAmount,
			pincode,
			AreaColony,
			city,
			isDelivered,
			isTrue,
		} = req.body;
		try {
			if (req.user.role == 'ADMIN') {
				// console.log('admin');
				const order = await Orders.findOne({ orderId: orderId });
				// console.log(order);
				if (order) {
					order.paymentStatus = paymentStatus;
					order.modeOfPayment = modeOfPayment;
					order.phone = phone;
					order.totalAmount = totalAmount;
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
