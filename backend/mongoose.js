const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect(
	''
).then(() => {
	console.log('Connected to database!');
}).catch(() => {
	console.log('Connection failed!');
});

const createProduct = async (req, res, next) => {
	const createdProduct = new Product({
		title: req.body.title,
		price: req.body.price,
	});
	const result = await createdProduct.save();
	res.json(result);
};

const getProducts = async (req, res, next) => {
	const products = await Product.find().exec();
	res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;