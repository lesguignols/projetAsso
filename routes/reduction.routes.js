const router = require('express').Router();
const reductionController = require('../controllers/reduction.controller');

//get Reduction
router.get('/', reductionController.getAll);
router.get('/id/:id', reductionController.getInfo);
router.get('/active', reductionController.getByActive);
router.get('/products', reductionController.getByProducts);

//add Reduction
router.post('/', reductionController.addReduction);

//update Reduction
router.put('/name/:id', reductionController.updateName);
router.put('/active/:id', reductionController.updateActive);
router.put('/rate/:id', reductionController.updateRate);
router.put('/products/:id', reductionController.updateProducts);

module.exports = router;