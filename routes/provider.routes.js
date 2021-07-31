const router = require('express').Router();
const providerController = require('../controllers/provider.controller');

//get Price
router.get('/', providerController.getAll);
router.get('/id/:id', providerController.getInfo);
router.get('/name', providerController.getByName);

//add Price
router.post('/', providerController.addProvider);

//update Price
router.put('/name/:id', providerController.updateName);
router.put('/address/:id', providerController.updateAddress);
router.put('/phone/:id', providerController.updatePhone);
router.put('/email/:id', providerController.updateEmail);

module.exports = router;