const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { protect } = require('../middlewares/auth');
router.get(
	'/products',
	// protect,
	asyncHandler(async (req, res) => {
		const products = await Product.find({});

		res.status(200).json(products);
	})
);
router.post(
	'/add-product',
	// protect,
	asyncHandler(async (req, res) => {
		const {
			product_id,
			type,
			img_url,
			title,
			price,
			sizes,
			offer,
			product_color,
			discription,
			manufacturer,
			views_img,
			rating,
		} = req.body;

		const product = await Product.create({
			product_id: product_id,
			type: type,
			img_url: img_url,
			title: title,
			price: price,
			sizes: sizes,
			offer: offer,
			product_color: product_color,
			discription: discription,
			manufacturer: manufacturer,
			views_img: views_img,
			rating: rating,
		});
		res.status(200).json({ message: 'Product Added Succefully', product });
	})
);
router.delete(
	'/delete-product',
	// protect,
	asyncHandler(async (req, res) => {
		const { product_id } = req.body;
		try {
			const product = await Product.findOne({ product_id: product_id });
			// console.log(product);
			if (product) {
				await Product.findOneAndDelete({ product_id: product_id });
				res.json({ message: 'product deleted sucessfully' });
			} else {
				// console.log('eoorr ');
				throw Error('No product found');
			}
		} catch (err) {
			// console.log(err);
			res.status(400).json({ message: ' No product found' });
		}
	})
);
// router.put(
// 	'/update-product',
// 	// protect,
// 	asyncHandler(async (req, res) => {
// 		const {
// 			product_id,
// 			type,
// 			img_url,
// 			title,
// 			price,
// 			sizes,
// 			offer,
// 			product_color,
// 			discription,
// 			views_img,
// 		} = req.body;
// 		await Product.findOneAndUpdate(
// 			{ product_id },
// 			{
// 				$set: {
// 					type: type,
// 					img_url: img_url,
// 					title: title,
// 					price: price,
// 					sizes: sizes,
// 					offer: offer,
// 					product_color: product_color,
// 					discription: discription,
// 					views_img: views_img,
// 				},
// 			},
// 			{ returnOriginal: false },
// 			function (err, result) {
// 				if (err) {
// 					res.status.json({ message: 'Cannot update the product' });
// 					return;
// 				}
// 				res.status(200).json({ message: 'Product Updated' });
// 			}
// 		);
// 	})
// );
module.exports = router;
