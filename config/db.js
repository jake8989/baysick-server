const mongoose = require('mongoose');

const env = require('dotenv');
const connectDb = async () => {
	await mongoose
		.connect(process.env.DB_URL)
		.then(() => {
			console.log('Mongo Connected Succesfully');
		})
		.catch((error) => {
			console.log('error connecting in db', error);
		});
};
module.exports = connectDb;
