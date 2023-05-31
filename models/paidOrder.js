const mongoose = require('mongoose');
const paidOrder = mongoose.Schema(
	{
		paymentId: {
			type: String,
			require: true,
			unique: true,
		},
		orderId: {
			type: String,
			required: true,
			unique: true,
		},
		signature: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timeStamps: true,
	}
);
module.exports = mongoose.model('paidorders', paidOrder);
