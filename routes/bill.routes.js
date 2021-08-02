const router = require('express').Router();
const billController = require('../controllers/bill.controller');

//get Bill
router.get('/', billController.getAll);
router.get('/id/:id', billController.getInfo);
router.get('/member', billController.getByMember);
router.get('/date', billController.getByDate);
router.get('/period', billController.getByPeriod);
router.get('/pricegreater', billController.getByPriceGreater);
router.get('/priceless', billController.getByPriceLess);

//add Bill
router.post('/', billController.addBill);

module.exports = router;