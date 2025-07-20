const diagnosisController = require('../../controllers/diagnosis/diagnosis.controller');
const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/middleware');
const upload = require('../../middleware/multer.middleware');

router.post('/register', verifyToken, upload.single('image'), diagnosisController.registerDiagnosis);
router.get('/user/:userId', verifyToken, diagnosisController.getDiagnosisByUserId);

module.exports = router;