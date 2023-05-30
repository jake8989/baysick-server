const Razorpay = require('razorpay');
const dotenv = require('dotenv').config();
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
module.exports.verify = () => {
	res.send({ verify });
};
