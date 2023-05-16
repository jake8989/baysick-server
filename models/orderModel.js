const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	orderId: {
		type: String,
		required: true,
		unique: true,
	},
	paymentId: {
		type: String,
		require: true,
		unique: true,
	},
	totalAmount: {
		type: Number,
		required: true,
		unique: true,
	},
	paymentStatus: {
		type: String,
		required: true,
		default: 'NOT DONE YET',
	},
	modeOfPayment: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	houseNo: {
		type: String,
		required: true,
	},
	AreaColony: {
		type: String,
		required: true,
	},
	pincode: {
		type: Number,
		required: true,
	},
	city: {
		type: String,
		requied: true,
	},
	state: {
		type: String,
		requied: true,
	},

	typeOfAddress: {
		type: String,
		default: 'HOME ADDRESS',
	},
	DateOfOrderd: {
		type: Date,
	},
	DateOfDelivery: {
		type: Date,
	},
	isDelivered: {
		type: String,
		default: 'NOT DELIVERED',
	},
	isTrue: {
		type: String,
		required: true,
		default: false,
	},
});
module.exports = mongoose.model('orders', orderSchema);
