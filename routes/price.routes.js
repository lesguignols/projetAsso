const router = require('express').Router();
const priceController = require('../controllers/price.controller');

//get Price
router.get('/', priceController.getAll);
router.get('/id/:id', priceController.getInfo);
router.get('/active', priceController.getByActive);

//add Price
router.post('/', priceController.addPrice);

//update Price
router.put('/name/:id', priceController.updateName);
router.put('/price/:id', priceController.updatePrice);
router.put('/active/:id', priceController.updateActive);

module.exports = router;