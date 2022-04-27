const {validationResult} = require('express-validator');
const slugify = require('slugify');
const HttpError = require("../models/http-error");
const Product = require('../models/product');
const Category = require('../models/category');

const pageItemsCount = 3;

const getProducts = async (req, res, next) => {
	try {
		const {page} = req.query;
		const currentPage = page || 1;
		const products = await Product.find()
			.skip((currentPage - 1) * pageItemsCount)
			.populate('category')
			.limit(pageItemsCount)
			.exec();
		res.json(products);
	} catch (err) {
		const error = new HttpError(err, 500);
		return next(error);
	}
};

const getProductsPaging = async (req, res, next) => {
	try {
		const totalItemsCount = await Product.find({}).estimatedDocumentCount().exec();
		const pagesCount = Math.max(Math.ceil(totalItemsCount / pageItemsCount), 1);
		res.json({totalItemsCount, pageItemsCount, pagesCount});
	} catch (err) {
		const error = new HttpError(err, 500);
		return next(error);
	}
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

const getProductsByCategorySlug = async (req, res, next) => {
	const slug = req.params.categorySlug;
	let products;
	try {
		const {page} = req.query;
		const currentPage = page || 1;
		const category = await Category.findOne({categorySlug: slug}).exec();
		// with pagination
		products = await Product.find({category})
			.skip((currentPage - 1) * pageItemsCount)
			.populate('category')
			.limit(pageItemsCount)
			.exec();
		// without pagination
		// products = await Product.find({category}).populate('category');
	} catch (err) {
		const error = new HttpError('Could not find a products.', 500);
		return next(error);
	}
	if (!products || products.length === 0) {
		const error = new HttpError(
			'Could not find a place for the provided user id.', 404);
		return next(error);
	}
	const data = products.map(product => product.toObject({getters: true}));
	res.json(data);
};

const getProductsByCategorySlugPaging = async (req, res, next) => {
	try {
		const slug = req.params.categorySlug;
		const category = await Category.findOne({categorySlug: slug}).exec();
		const totalItemsCount = await Product
			.find({category})
			.count()
			.exec();
		const pagesCount = Math.max(Math.ceil(totalItemsCount / pageItemsCount), 1);
		res.json({totalItemsCount, pageItemsCount, pagesCount});
	} catch (err) {
		const error = new HttpError(err, 500);
		return next(error);
	}
};

const createProduct = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HttpError(
			'Invalid inputs passed, please check your data.', 422);
	}
	const {
		category,
		title,
		price,
		quantity,
		image,
		description
	} = req.body;
	const createdProduct = new Product({
		category,
		productSlug: slugify(title).toLocaleLowerCase(),
		title,
		price,
		quantity,
		image,
		description
	});
	try {
		await createdProduct.save();
	} catch (err) {
		const error = new HttpError(err, 500);
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
		quantity,
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
	product.quantity = quantity;
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
exports.getProductsPaging = getProductsPaging;
exports.getProductByProductSlug = getProductByProductSlug;
exports.getProductsByCategorySlug = getProductsByCategorySlug;
exports.getProductsByCategorySlugPaging = getProductsByCategorySlugPaging;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
