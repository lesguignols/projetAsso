const router = require('express').Router();
const offerController = require('../controllers/offer.controller');

//get Offer
router.get('/', offerController.getAll);
router.get('/id/:id', offerController.getInfo);
router.get('/active', offerController.getByActive);

//add Offer
router.post('/', offerController.addOffer);

//update Offer
router.put('/name/:id', offerController.updateName);
router.put('/description/:id', offerController.updateDescription);
router.put('/active/:id', offerController.updateActive);
router.put('/price/:id', offerController.updatePrice);
router.put('/products/:id', offerController.updateProducts);
router.put('/daily/:id', offerController.updateDaily);
router.put('/adherentsexclusivity/:id', offerController.updateAdherentsExclusivity);
router.put('/start/:id', offerController.updateStart);
router.put('/end/:id', offerController.updateEnd);

module.exports = router;