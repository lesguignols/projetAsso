const router = require('express').Router();
const coinsController = require('../../controllers/slip/coins.controller');

//get SlipCoins
router.get('/', coinsController.getAll);
router.get('/id/:id', coinsController.getInfo);
router.get('/date', coinsController.getByDate);
router.get('/period', coinsController.getByPeriod);
router.get('/member', coinsController.getByMember);
router.get('/greater', coinsController.getByTotalAmountGreater);
router.get('/less', coinsController.getByTotalAmountLess);
router.get('/numslip', coinsController.getByNumSlip);

//add SlipcCoins
router.post('/', coinsController.addSlipCoins);

module.exports = router;