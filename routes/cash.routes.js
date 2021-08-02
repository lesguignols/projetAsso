const router = require('express').Router();
const cashController = require('../controllers/cash.controller');

//get cash
router.get('/', cashController.getAll);
router.get('/id/:id', cashController.getInfo);

//update Cash
router.put('/addamount/:id', cashController.addAmount);

module.exports = router;