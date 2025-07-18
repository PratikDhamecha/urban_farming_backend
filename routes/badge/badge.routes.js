const express = require('express');
const BadgeController = require('../../controllers/badge/badge.controller');
const router = express.Router();

// Badge routes
router.get('/', BadgeController.getAllBadges);
router.get('/user/:userId', BadgeController.getUserBadges);
router.post('/award/:userId', BadgeController.awardBadge);
router.post('/initialize', BadgeController.initializeBadges);

module.exports = router;
