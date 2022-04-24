const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
	},
	categorySlug: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		index: true,
		minlength: [3, 'Slug must be at least 3 characters long.'],
		maxlength: [15, 'Slug must be at most 15 characters long.'],
		match: [/^[a-zA-Z0-9-]+$/, 'Slug must contain only letters, numbers and dashes.']
	},
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', categorySchema);
