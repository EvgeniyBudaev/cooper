const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require("./models/http-error");
const mongoPractice = require('./mongoose');

const app = express();

app.use(bodyParser.json());

const PORT = 5000;

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

app.post('/products', mongoPractice.createProduct);
app.get('/products', mongoPractice.getProducts);

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

mongoose
	.connect(
		''
	).then(() => {
	console.log('Connected to database!');
}).catch(() => {
	console.log('Connection failed!');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
