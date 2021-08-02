const router = require('express').Router();
const inventorySupposedController = require('../../controllers/inventory/inventory.supposed.controller');

//get CashFund
router.get('/', inventorySupposedController.getAll);
router.get('/id/:id', inventorySupposedController.getInfo);

//add CashFund
router.post('/', inventorySupposedController.addInventorySupposed);

module.exports = router;