const mongoose = require('mongoose');
const errorHandler = require('../middlewares/errorHandler');
const env = require('dotenv');
const connectDb = async (req, res, errorHandler) => {
	await mongoose
		.connect(process.env.DB_URL)
		.then(() => {
			console.log('Mongo Connected Succesfully');
		})

		.catch(errorHandler, (error) => {
			// errorHandler('An error Occurred!');
			// errorHandler(error);
			console.log('error connecting in db', error);
		});
};
module.exports = connectDb;
