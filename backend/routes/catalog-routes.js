const express = require('express');
const {check} = require('express-validator');
const catalogControllers = require('../controllers/catalog-controllers');

const router = express.Router();

router.get('/:productId', catalogControllers.getProductById);

router.get('/user/:uid', catalogControllers.getProductsByUserId);

router.post(
	'/',
	[
		check('creator')
			.not().isEmpty(),
		check('price')
			.not().isEmpty(),
		check('title')
			.not().isEmpty(),
	],
	catalogControllers.createProduct,
);

router.patch('/:productId', [
	check('price')
		.not().isEmpty(),
	check('title')
		.not().isEmpty(),
], catalogControllers.updateProduct);

router.delete('/:productId', catalogControllers.deleteProduct);

module.exports = router;
