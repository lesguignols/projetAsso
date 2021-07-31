const router = require('express').Router();
const productController = require('../controllers/product.controller');

// get Product
router.get('/', productController.getAll);
router.get('/id/:id', productController.getInfo);
router.get('/barcode', productController.getByBarcode);

//add Product
router.post('/', productController.addProduct);

//update Product
router.put('/barcode/:id', productController.updateBarcode);
router.put('/name/:id', productController.updateName);
router.put('/sellingprice/:id', productController.updateSellingPrice);

module.exports = router;