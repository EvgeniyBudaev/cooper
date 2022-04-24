const {validationResult} = require('express-validator');
const slugify = require('slugify');
const HttpError = require("../models/http-error");
const Category = require('../models/category');

const getCategories = async (req, res, next) => {
	const categories = await Category.find().exec();
	res.json(categories);
};

const createCategory = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HttpError(
			'Invalid inputs passed, please check your data.', 422);
	}
	try {
		const {title} = req.body;
		const createdCategory = new Category(
			{title, categorySlug: slugify(title).toLocaleLowerCase()}
		);
		await createdCategory.save();
		res.status(201).json({category: createdCategory});
	} catch (err) {
		const error = new HttpError(
			err, 500);
		return next(error);
	}
};

exports.getCategories = getCategories;
exports.createCategory = createCategory;
