const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: Number,
		// required: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: { type: String, default: '' },
	role: {
		type: String,
		default: 'LOOKFOR',
	},
	strategy: {
		type: String,
		default: 'LOCAL',
	},
	likedItems: {
		type: Array,
		default: [],
	},
	orders: {
		type: Array,
		default: [],
	},
});
module.exports = mongoose.model('users', userSchema);
