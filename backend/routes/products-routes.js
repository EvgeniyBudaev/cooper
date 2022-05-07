const express = require('express');
const {check} = require('express-validator');
const productsControllers = require('../controllers/products-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', productsControllers.getProducts);

router.get('/paging', productsControllers.getProductsPaging);

router.get('/:productSlug', productsControllers.getProductByProductSlug);

router.get(
	'/category/:categorySlug',
	productsControllers.getProductsByCategorySlug);

router.get(
	'/category/:categorySlug/paging',
	productsControllers.getProductsByCategorySlugPaging);

// router.use(checkAuth);

router.post(
	'/create',
	[
		check('title').not().isEmpty(),
		check('price').not().isEmpty(),
		check('quantity').not().isEmpty(),
		check('image').not().isEmpty(),
	],
	productsControllers.createProduct,
);

router.patch('/edit/:productSlug', [
	check('title').not().isEmpty(),
	check('price').not().isEmpty(),
	check('quantity').not().isEmpty(),
	check('image').not().isEmpty(),
], productsControllers.updateProduct);

router.delete('/:productSlug', productsControllers.deleteProduct);

module.exports = router;
