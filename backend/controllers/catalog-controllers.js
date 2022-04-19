const {v4: uuid} = require('uuid');
const {validationResult} = require('express-validator');
const HttpError = require("../models/http-error");

let DUMMY_CATALOG = [
	{id: '1', creator: "admin", price: '1000', title: 'Медный чайник'},
	{id: '2', creator: "admin", price: '2000', title: 'Гидролат'}
];

const getProductById = (req, res, next) => {
	const productId = req.params.productId;
	const product = DUMMY_CATALOG.find(product => product.id === productId);
	if (!product) {
		throw new HttpError('Товар не найден', 404);
		// return next(new HttpError('Товар не найден', 404));
	}
	res.status(200).json({product});
};

const getProductsByUserId = (req, res, next) => {
	const userId = req.params.uid;
	const products = DUMMY_CATALOG.filter(product => product.creator === userId);
	if (!products || products.length === 0) {
		throw new HttpError('Could not find a place for the provided user id.', 404);
		// return next(new HttpError('Товар не найден', 404));
	}
	res.status(200).json({products});
};

const createProduct = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}
	const {creator, price, title} = req.body;
	const product = {
		id: uuid(),
		creator,
		price,
		title
	};
	DUMMY_CATALOG.push(product);
	res.status(201).json({product});
};

const updateProduct = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
	}
	const productId = req.params.productId;
	const {price, title} = req.body;
	const product = {...DUMMY_CATALOG.find(product => product.id === productId)};
	const productIndex = DUMMY_CATALOG.findIndex(product => product.id === productId);
	if (!product) {
		throw new HttpError('Товар не найден', 404);
	}
	product.price = price;
	product.title = title;
	DUMMY_CATALOG[productIndex] = product;
	res.status(200).json({product});
};

const deleteProduct = (req, res, next) => {
	const productId = req.params.productId;
	if (!DUMMY_CATALOG.find(product => product.id === productId)) {
		throw new HttpError('Товар не найден', 404);
	}
	DUMMY_CATALOG = DUMMY_CATALOG.filter(product => product.id !== productId);
	res.status(200).json({message: 'Товар удален'});
};

exports.getProductById = getProductById;
exports.getProductsByUserId = getProductsByUserId;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
