const router = require('express').Router();
const saleController = require('../controllers/sale.controller');

//get Sale
router.get('/', saleController.getAll);
router.get('/id/:id', saleController.getInfo);
router.get('/seller', saleController.getBySeller);
router.get('/buyer', saleController.getByBuyer);
router.get('/date', saleController.getByDate);
router.get('/period', saleController.getByPeriod);
router.get('/pricegreater', saleController.getByPriceGreater);
router.get('/priceless', saleController.getByPriceLess);

//add Sale
router.post('/', saleController.addSale);

module.exports = router;