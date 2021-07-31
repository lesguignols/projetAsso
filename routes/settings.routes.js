const router = require('express').Router();
const settingsController = require('../controllers/settings.controller');

//get Settings
router.get('/', settingsController.getAll);
router.get('/id/:id', settingsController.getInfo);

//add Settings
router.post('/', settingsController.addSettings);

//update Settings
router.put('/photodirectory/:id', settingsController.updatePhotoDirectory);
router.put('/cashregister/:id', settingsController.updateCashRegister);
router.put('/scan/:id', settingsController.updateScan);

module.exports = router;