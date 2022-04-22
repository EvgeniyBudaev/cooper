const {validationResult} = require('express-validator');
const HttpError = require("../models/http-error");
const Product = require('../models/product');

const getProducts = async (req, res, next) => {
	const products = await Product.find().exec();
	res.json(products);
};

const getProductByProductSlug = async (req, res, next) => {
	const productSlug = req.params.productSlug;
	let product;
	try {
		// product = await Product.findById(productSlug); // search by id
		// search by product slug
		product = await Product.findOne({productSlug: productSlug});
	} catch (err) {
		const error = new HttpError('Could not find a product.', 500);
		return next(error);
	}
	if (!product) {
		const error = new HttpError(
			'Could not find a product for the provided id.', 404);
		return next(error);
	}
	res.json({product: product.toObject({getters: true})});
};

const getProductsByCatalogSlug = async (req, res, next) => {
	const catalogSlug = req.params.catalogSlug;
	let products;
	try {
		products = await Product.find({catalogSlug: catalogSlug});
	} catch (err) {
		const error = new HttpError('Could not find a products.', 500);
		return next(error);
	}
	if (!products || products.length === 0) {
		const error = new HttpError(
			'Could not find a place for the provided user id.', 404);
		return next(error);
	}
	res.json(
		{products: products.map(product => product.toObject({getters: true}))}
	);
};

const createProduct = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HttpError(
			'Invalid inputs passed, please check your data.', 422);
	}
	const {
		catalogSlug,
		productSlug,
		title,
		price,
		count,
		image,
		description
	} = req.body;
	const createdProduct = new Product({
		catalogSlug,
		productSlug,
		title,
		price,
		count,
		image,
		description
	});
	try {
		await createdProduct.save();
	} catch (err) {
		const error = new HttpError(
			'Creating a product failed, please try again.', 500);
		return next(error);
	}
	res.status(201).json({product: createdProduct});
};

const updateProduct = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HttpError(
			'Invalid inputs passed, please check your data.', 422);
	}
	const productSlug = req.params.productSlug;
	const {
		title,
		price,
		count,
		image,
		description
	} = req.body;
	let product;
	try {
		product = await Product.findOne({productSlug: productSlug});
	} catch (err) {
		const error = new HttpError('Could not update product.', 500);
		return next(error);
	}
	product.title = title;
	product.price = price;
	product.count = count;
	product.image = image;
	product.description = description;
	try {
		await product.save();
	} catch (err) {
		const error = new HttpError(
			'Could not update product.', 500);
		return next(error);
	}
	res.status(200).json({product: product.toObject({getters: true})});
};

const deleteProduct = async (req, res, next) => {
	const productSlug = req.params.productSlug;
	let product;
	try {
		product = await Product.findOne({productSlug: productSlug});
	} catch (err) {
		const error = new HttpError('Could not find a product.', 500);
		return next(error);
	}
	try {
		await product.remove();
	} catch (err) {
		const error = new HttpError('Could not delete product.', 500);
		return next(error);
	}
	res.status(200).json({message: 'Deleted product'});
};

exports.getProducts = getProducts;
exports.getProductByProductSlug = getProductByProductSlug;
exports.getProductsByCatalogSlug = getProductsByCatalogSlug;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
