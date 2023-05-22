const errorHandeler = (err, req, res, next) => {
	const statusCode = 500;
	res.status(statusCode);
	res.json({ message: err.message });
	// next();
};
// export {};
module.exports = { errorHandeler };
