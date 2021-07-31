const router = require('express').Router();
const inventoryController = require('../../controllers/inventory/inventory.controller');

//get CashFund
router.get('/', inventoryController.getAll);
router.get('/id/:id', inventoryController.getInfo);

//add CashFund
router.post('/', inventoryController.addInventory);

module.exports = router;