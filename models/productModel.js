const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		product_id: {
			type: Number,
			unique: true,
			required: true,
		},
		type: {
			type: String,
			default: 'T-SHIRT',
		},
		img_url: {
			type: String,
			required: true,
			unique: true,
		},
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
		},
		sizes: {
			type: Array,
			required: true,
		},
		offer: {
			type: Number,
		},
		product_color: {
			type: String,
		},
		discription: {
			type: String,
		},
		manufacturer: {
			type: String,
		},
		views_img: {
			type: Array,
		},
		rating: {},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('products', productSchema);
