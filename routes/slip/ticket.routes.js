const router = require('express').Router();
const ticketController = require('../../controllers/slip/ticket.controller');

//get SlipCoins
router.get('/', ticketController.getAll);
router.get('/id/:id', ticketController.getInfo);
router.get('/date', ticketController.getByDate);
router.get('/period', ticketController.getByPeriod);
router.get('/member', ticketController.getByMember);
router.get('/greater', ticketController.getByTotalAmountGreater);
router.get('/less', ticketController.getByTotalAmountLess);
router.get('/numslip', ticketController.getByNumSlip);

//add SlipcCoins
router.post('/', ticketController.addSlipTicket);

module.exports = router;