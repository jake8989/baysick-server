const express = require('express');
const env = require('dotenv').config();
const asyncHandler = require('express-async-handler');
const connectDb = require('./config/db');
const { errorHandeler } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoute');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require('cors');
const port = process.env.PORT || 8080;
connectDb();
app.use(express.json());
app.use(
	cors({
		origin: 'https://baysick-client-qvls0s782-jake8989.vercel.app',
	})
);
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/orders', require('./routes/orderRoute'));
app.use(errorHandeler);
app.listen(port, () => {
	console.log(`server is listing at port ${port}`);
});
