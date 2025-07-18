const diagnosisController = require('../../controllers/diagnosis/diagnosis.controller');
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middlewares/auth.middleware');
const upload = require('../../config/multer');

router.post('/register', verifyToken, upload.single('image'), diagnosisController.registerDiagnosis);
router.get('/user/:userId', verifyToken, diagnosisController.getDiagnosisByUserId);

module.exports = router;