const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({
	catalogSlug: {
		type: String,
		required: true
	},
	productSlug: {
		type: String,
		required: true,
		unique: true
	},
	title: {type: String, required: true},
	price: {type: String, required: true},
	count: {type: Number, required: true},
	image: {type: String, required: true},
	description: {type: String},
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);
