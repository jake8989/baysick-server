const Razorpay = require('razorpay');
const dotenv = require('dotenv').config();
const expres = require('express');
const app = expres();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const asyncHandler = require('express-async-handler');
const paidOrder = require('../models/paidOrder');
module.exports.orders = async (req, res) => {
	var instance = new Razorpay({
		key_id: `${process.env.RAZORPAY_KEY_ID}`,
		key_secret: `${process.env.RAZORPAY_KEY_SECRET}`,
	});
	const { amount, order_id } = req.body;
	var options = {
		amount: amount * 100,
		currency: 'INR',
		receipt: order_id,
	};
	instance.orders.create(options, function (err, order) {
		if (err) {
			return res.status(500).send({ message: 'Server Error' });
		}
		console.log(order);
		res
			.status(200)
			.send({ message: 'Order Created Successfully', data: order });
	});
};
module.exports.verify = asyncHandler(async (req, res) => {
	const { paymentId } = req.body;
	try {
		const paid_order = await paidOrder.findOne({ paymentId: paymentId });
		if (paid_order) {
			res.status(200).json({ message: 'Order and Slug Found!' });
			// console.log(paid_order);
		} else {
			res.status(400).json({ message: 'No Order Id Found for this slug_id' });
		}
	} catch (error) {
		res.status(400).json({ message: 'No Order Id Found for this slug_id' });
	}
});
module.exports.set = asyncHandler(async (req, res) => {
	const { paymentId, orderId, signature } = req.body;

	try {
		const paid_order = await paidOrder.create({
			paymentId,
			orderId,
			signature,
		});
		const createTransporter = async () => {
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					type: 'OAuth2',
					user: process.env.EMAIL,
					pass: process.env.EMAIL_PASS,
					clientId: process.env.CLIENT_ID,
					clientSecret: process.env.CLIENT_SECRET,
					refreshToken: process.env.REFRESH_TOKEN,
				},
			});

			return transporter;
		};

		const sendEmail = async (emailOptions) => {
			let emailTransporter = await createTransporter();
			await emailTransporter.sendMail(emailOptions);
		};

		sendEmail({
			subject: 'BaySick T-Shirts',
			text: `Mr/Ms user Order Successfully Recieved By BaySick Team  \n Your Total order Amount is 900`,
			to: 'jjk19106864@gmail.com',
			from: process.env.EMAIL,
		});
		res.status(200).json({ message: 'PaidOrder created Successfully!' });
		console.log(paid_order);
	} catch (error) {
		res.status(401).json({ message: 'Server Error!' });
	}
});
