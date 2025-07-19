const growthController = require('../../controllers/growth/growth.controller');
const express = require('express');
const verifyToken = require('../../middleware/middleware');
const router = express.Router();
const upload = require('../../middleware/multer.middleware');

router.post('/growth-entries', verifyToken, growthController.createGrowthEntry);
router.get('/growth-entries/:userId', verifyToken, growthController.getAllGrowthEntries);
router.post('/growth-entries/uploadImage/:id', verifyToken, upload.single('image'), growthController.uploadImageInGrowthEntry);

module.exports = router;