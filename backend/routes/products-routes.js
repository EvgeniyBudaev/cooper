const express = require('express');
const {check} = require('express-validator');
const productsControllers = require('../controllers/products-controllers');

const router = express.Router();

router.get('/:productSlug', productsControllers.getProductByProductSlug);

router.get('/catalog/:catalogSlug', productsControllers.getProductsByCatalogSlug);

router.post(
	'/',
	[
		check('catalogSlug').not().isEmpty(),
		check('productSlug').not().isEmpty(),
		check('title').not().isEmpty(),
		check('price').not().isEmpty(),
		check('count').not().isEmpty(),
		check('image').not().isEmpty(),
	],
	productsControllers.createProduct,
);

router.patch('/:productSlug', [
	check('title').not().isEmpty(),
	check('price').not().isEmpty(),
	check('count').not().isEmpty(),
	check('image').not().isEmpty(),
], productsControllers.updateProduct);

router.delete('/:productSlug', productsControllers.deleteProduct);

module.exports = router;
