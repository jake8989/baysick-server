const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { protect } = require('../middlewares/auth');
// const { protect } = require('../middlewares/authHandler');
router.post(
	'/signup',
	// checkLoggedIn,
	asyncHandler(async (req, res) => {
		const { name, email, phone, password, strategy, likedItems, role } =
			req.body;
		console.log(name, email, phone, password, role);
		const userExits = await User.findOne({ email });
		try {
			if (userExits) {
				res.status(400);
				throw new Error('email already exits');
			}
		} catch {
			res.json({ message: 'email already exists' });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await User.create({
			name: name,
			email: email,
			phone: phone,
			password: hashedPassword,
			role,
			strategy,
			likedItems,
		});
		// req.user = user;
		if (user) {
			res.json({
				user,
				token: generateToken(user._id),
			});
			// localStorage.setItem('user', user);
		} else {
			res.status(400);
			throw new Error('Server not working');
		}
	})
);
router.post(
	'/login',
	// protect,
	asyncHandler(async (req, res) => {
		// res.json({ message: 'login user' });
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		// req.user = user;
		try {
			if (user && (await bcrypt.compare(password, user.password))) {
				res.status(200).json({
					user,
					message: 'logged in succesfully',
					token: generateToken(user._id),
				});
				// localStorage.setItem('user', user);
				// console.log('userRoutes', req.cookies);
			} else {
				throw new Error('User with this email is not found');
			}
		} catch (error) {
			res.status(400);
			res.json({ message: 'User with this email is not found' });
			// console.log(req.user);
			// console.log(error);
		}
	})
);
router.put(
	'/update-user',
	// protect,
	asyncHandler(async (req, res, next) => {
		const { name, email, password, about } = req.body;
		const user = await User.findById(req.user._id);
		console.log('user', req.user);
		console.log(req.user._id);
		try {
			if (user) {
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);
				user.name = name;
				user.email = email;
				user.password = hashedPassword;
				user.role = 'Updated user';
				await user.save();
				token = generateToken(req.user.userId);
				res.status(200).json({ user, message: 'updated succesfully', token });
			} else {
				// res.status(401);s
				throw new Error('no user found');
			}
		} catch (error) {
			res.status(400);
			res.json({ message: 'Cannnot update the user' });
		}
	})
);
router.get('/me', (req, res) => {
	res.status(200).json({ name: req.user });
});
//generate JWT Token
const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});
};
module.exports = router;
