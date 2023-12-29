const router = require('express').Router();
const projectsController = require('../controllers/projects.controller');
const multer = require("../middleware/multer-config");
const auth = require('../middleware/auth');

router.post('/create', multer, projectsController.createProjects);
router.put('/put/:id', multer, projectsController.putProject);
router.get('/get', projectsController.getProjects);
router.get('/get/:id', projectsController.getOneProjects);
router.delete('/delete', projectsController.deleteProjects);
router.delete('/delete/:id', projectsController.deleteOneProjects);

module.exports = router;
