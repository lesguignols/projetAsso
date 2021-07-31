const router = require('express').Router();
const cashFundController = require('../controllers/cashfund.controller');

//get CashFund
router.get('/', cashFundController.getAll);
router.get('/id/:id', cashFundController.getInfo);
router.get('/date', cashFundController.getByDate);
router.get('/period', cashFundController.getByPeriod);
router.get('/member', cashFundController.getByMember);
router.get('/period&member', cashFundController.getByPeriodAndMember);
router.get('/sumgreater', cashFundController.getBySumGreater);
router.get('/sumless', cashFundController.getBySumLess);

//add CashFund
router.post('/', cashFundController.addCashFund);

module.exports = router;