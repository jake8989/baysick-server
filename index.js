const express = require('express');
const env = require('dotenv').config();
const asyncHandler = require('express-async-handler');
const connectDb = require('./config/db');
const { errorHandeler } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoute');
const app = express();
const port = process.env.PORT || 8080;
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
const cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/orders', require('./routes/orderRoute'));
app.use('/api/payment', require('./routes/paymentRoute'));
app.use(errorHandeler);
app.listen(port, () => {
	console.log(`server is listing at port ${port}`);
});
