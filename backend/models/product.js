const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	},
	productSlug: {
		type: String,
		trim: true,
		required: true,
		index: true,
		unique: true,
		minlength: [3, 'Slug must be at least 3 characters long.'],
		match: [/^[a-zA-Z0-9-]+$/, 'Slug must contain only letters, numbers and dashes.']
	},
	title: {type: String, required: true, trim: true, text: true, index: true},
	price: {type: String, required: true},
	quantity: {type: Number, required: true},
	image: {type: String, required: true},
	description: {type: String},
});

productSchema.index({title: 'text'});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);
