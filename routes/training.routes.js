const router = require('express').Router();
const trainingController = require('../controllers/training.controller');

//get Training
router.get('/', trainingController.getAll);
router.get('/id/:id', trainingController.getInfo);
router.get('/curriculum', trainingController.getByCurriculum);
router.get('/wording', trainingController.getByWording);
router.get('/year', trainingController.getByYear);
router.get('/curriculum&year', trainingController.getByCurriculumAndYear);

//add Training
router.post('/', trainingController.addTraining);

//update Training
router.put('/curriculum/:id', trainingController.updateCurriculum);
router.put('/wording/:id', trainingController.updateWording);
router.put('/year/:id', trainingController.updateYear);

module.exports = router;