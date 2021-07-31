const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const adherentController = require('../controllers/adherent.controller');
const multer = require('multer');
const upload = multer();

//auth
router.post("/register", upload.single('file'), authController.addAdherent);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

//adherent DB
router.get('/', adherentController.getAll);
router.get('/id/:id', adherentController.getInfo);
router.get('/card', adherentController.getByCard);
router.get('/name', adherentController.getByName);
router.get('/firstName', adherentController.getByFirstName);
router.get('/price', adherentController.getByPrice);
router.get('/training', adherentController.getByTraining);
router.get('/active', adherentController.getByActive);
router.get('/member', adherentController.getByMember);
router.get('/administrator', adherentController.getByAdministrator);
router.get('/superAdministrator', adherentController.getBySuperAdministrator);

//update adherent by ID
router.put('/card/:id', adherentController.updateCard);
router.put('/name/:id', adherentController.updateName);
router.put('/firstname/:id', adherentController.updateFirstName);
router.put('/email/:id', adherentController.updateEmail);
router.put('/price/:id', adherentController.updatePrice);
router.put('/training/:id', adherentController.updateTraining);
router.put('/active/:id', adherentController.updateActive);
router.put('/member/:id', adherentController.updateMember);
router.put('/code/:id', adherentController.updateCode);
router.put('/secretcode/:id', adherentController.updateSecretCode);
router.put('/administrator/:id', adherentController.updateAdministrator);
router.put('/superAdministrator/:id', adherentController.updateSuperAdministrator);

module.exports = router;