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
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},

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
});
module.exports = mongoose.model('users', userSchema);
