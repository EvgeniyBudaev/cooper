const express = require('express');
const bodyParser = require('body-parser');
const catalogRoutes = require('./routes/catalog-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

const PORT = 5000;

app.use('/api/catalog', catalogRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
	throw new HttpError('Could not find this route.', 404);
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
