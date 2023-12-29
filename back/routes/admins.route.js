const router = require('express').Router();
const adminsController = require('../controllers/admins.controller');

router.post('/register', adminsController.createUser);
router.post('/login', adminsController.signUp);
router.get('/dashboard', adminsController.dashboard);


module.exports = router;
