const jwt = require('jsonwebtoken');
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	// Authorization: 'Bearer token'
	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			throw new Error("Authentication failed.");
		}
		const decodedToken = jwt.verify(
			token, process.env.TOKEN_SECRET_KEY);
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (err) {
		const error = new HttpError("Authentication failed, please check your token", 401);
		return next(error);
	}
};
