const express = require('express');
const UserController = require('../../controllers/user/user.controller');
const router = express.Router();
const verifyToken = require('../../middleware/middleware');
const upload = require('../../Config/multer');


// Auth routes
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Profile routes
router.get('/profile/:userId', verifyToken, UserController.getUserProfile);
router.put('/profile/:userId', verifyToken, UserController.updateUserProfile);
router.put('/profile/upload/:userId',upload.single('image'), UserController.updateUserProfile);
// XP and stats routes
router.post('/xp/:userId', verifyToken, UserController.addXP);
router.post('/stats/:userId', verifyToken, UserController.updateUserStats);

module.exports = router;
