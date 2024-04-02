const express = require('express');
const router = express.Router();
const resourceController = require('../Controllers/resource.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);

router.get('/packages', resourceController.getPackages);
router.post('/packages', resourceController.createPackage);
router.put('/packages/:id', resourceController.updatePackage);
router.delete('/packages/:id', resourceController.deletePackage);

// Similar routes for customers, work, and events

module.exports = router;
